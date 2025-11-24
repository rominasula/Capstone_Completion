import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axiosConfig";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const STATUSES = ["pending", "in-progress", "completed"];
const LABEL = {
  pending: "Pending",
  "in-progress": "In-Progress",
  completed: "Completed",
};

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [columns, setColumns] = useState({
    pending: [],
    "in-progress": [],
    completed: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [projRes, tasksRes] = await Promise.all([
        api.get(`/projects/${id}`),
        api.get(`/projects/${id}/tasks`),
      ]);

      setProject(projRes.data);

      const grouped = { pending: [], "in-progress": [], completed: [] };
      (tasksRes.data || []).forEach((t) => {
        const s = t.status || "pending";
        grouped[s] = grouped[s] || [];
        grouped[s].push(t);
      });

      setColumns(grouped);
    } catch (err) {
      console.error("Failed loading project details", err);
    } finally {
      setLoading(false);
    }
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    const from = source.droppableId;
    const to = destination.droppableId;

    if (from === to) return;

    const task = columns[from].find((t) => t._id === draggableId);
    if (!task) return;

    // optimistic UI
    const newCols = {
      ...columns,
      [from]: columns[from].filter((t) => t._id !== draggableId),
      [to]: [task, ...columns[to]],
    };
    setColumns(newCols);

    try {
      await api.put(`/projects/tasks/${draggableId}`, { status: to });
    } catch (err) {
      console.error("Failed to update task status:", err);
      // rollback
      setColumns((prev) => {
        const rollback = { ...prev };
        rollback[from] = [task, ...rollback[from]];
        rollback[to] = rollback[to].filter((t) => t._id !== draggableId);
        return rollback;
      });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!project) return <div>Project not found</div>;

  return (
    <div className="jira-shell">
      <header className="page-header">
        <h1>{project.name}</h1>
        <p className="muted">{project.description}</p>
      </header>

      <div style={{ marginTop: 18 }}>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="kanban">
            {STATUSES.map((status) => (
              <Droppable key={status} droppableId={status}>
                {(provided) => (
                  <div
                    className="column"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <h4 className="column-title">{LABEL[status]}</h4>

                    {columns[status].map((task, index) => (
                      <Draggable key={task._id} draggableId={task._id} index={index}>
                        {(prov) => (
                          <div
                            className="kanban-card"
                            ref={prov.innerRef}
                            {...prov.draggableProps}
                            {...prov.dragHandleProps}
                            style={{ userSelect: "none", ...prov.draggableProps.style }}
                          >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <strong>{task.title}</strong>
                              <span className={`priority-badge ${task.priority || "medium"}`}>
                                {task.priority || "medium"}
                              </span>
                            </div>

                            <p className="muted small" style={{ marginTop: 6 }}>{task.description}</p>
                          </div>
                        )}
                      </Draggable>
                    ))}

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}
