'use client';

import React, { useState } from 'react';
import {DndContext,closestCenter,useSensor,useSensors,PointerSensor,DragOverlay,
} from '@dnd-kit/core';
import {SortableContext,useSortable,arrayMove,rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const MemberItem = ({ id, name, isDragging, listeners, attributes, setNodeRef, style }) => {
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        padding: '8px 12px',
        background: isDragging ? '#d1d5db' : '#fff',
        border: '1px solid #ccc',
        borderRadius: 6,
        marginBottom: 8,
        boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
        cursor: 'grab',
        ...style
      }}
    >
      {name}
    </div>
  );
};

export default function MemberDnD() {
  const [available, setAvailable] = useState([
    { id: '1', name: 'Alice' },
    { id: '2', name: 'Bob' },
    { id: '3', name: 'Charlie' }
  ]);

  const [team, setTeam] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(useSensor(PointerSensor));

  const findMember = (id) => {
    return available.find(m => m.id === id) || team.find(m => m.id === id);
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const fromList = available.find(m => m.id === active.id) ? available : team;
    const toList = over.id === 'team-container' ? team : available;

    if (fromList === toList) return;

    const movingItem = findMember(active.id);

    if (fromList === available) {
      setAvailable((items) => items.filter((m) => m.id !== active.id));
      setTeam((items) => [...items, movingItem]);
    } else {
      setTeam((items) => items.filter((m) => m.id !== active.id));
      setAvailable((items) => [...items, movingItem]);
    }

    setActiveId(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex justify-between gap-8 p-6">
        {/* Left: Team Box */}
        <div
          id="team-container"
          className="w-1/2 min-h-[200px] p-4 bg-blue-50 rounded shadow"
        >
          <h2 className="text-lg font-semibold mb-4">Team</h2>
          {team.map((member) => (
            <DraggableItem key={member.id} member={member} />
          ))}
        </div>

        {/* Right: Available Members */}
        <div
          id="available-container"
          className="w-1/2 min-h-[200px] p-4 bg-gray-100 rounded shadow"
        >
          <h2 className="text-lg font-semibold mb-4">Available Members</h2>
          {available.map((member) => (
            <DraggableItem key={member.id} member={member} />
          ))}
        </div>
      </div>

      <DragOverlay>
        {activeId ? (
          <MemberItem
            id={activeId}
            name={findMember(activeId)?.name}
            isDragging
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

function DraggableItem({ member }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: member.id
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <MemberItem
      id={member.id}
      name={member.name}
      isDragging={isDragging}
      setNodeRef={setNodeRef}
      attributes={attributes}
      listeners={listeners}
      style={style}
    />
  );
}
