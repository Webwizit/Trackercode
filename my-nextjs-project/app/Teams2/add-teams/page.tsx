'use client';
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Button, Card, Col, Container, Row, Tab, Tabs } from 'react-bootstrap';

import 'primereact/resources/themes/lara-light-blue/theme.css'; // or another theme
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import { MultiSelect } from 'primereact/multiselect';



const initialMembers = [
  { id: '1', name: 'Hamza R', initials: 'HR' },
  { id: '2', name: 'Sara K', initials: 'SK' },
  { id: '3', name: 'Ali M', initials: 'AM' }
];

const initialTeams = {
  development: [],
  management: []
};

export default function Home() {


// for MultiSelect selectbox 
const [selectedCities, setSelectedCities] = useState([]);




const [addedCities, setAddedCities] = useState([]);
const handleAddCities = () => {
  // Prevent duplicates
  const newCities = selectedCities.filter(
      (city) => !addedCities.some((added) => added.code === city.code)
  );
  setAddedCities([...addedCities, ...newCities]);
  setSelectedCities([]); // Clear the selected cities
};


const handleRemoveCity = (code) => {
  setAddedCities(addedCities.filter((city) => city.code !== code));
};

const handleClearAll = () => {
  setAddedCities([]);
};





const cities = [
    { name: 'Development Team', code: 'DT' },
    { name: 'Product Management', code: 'PM' },
    { name: 'Quality Assurance (QA)', code: 'QA' }
    
];


const [selectedProject, setSelectedProject] = useState([]);

const projects = [
    { name: 'Getting Started with WewWizTracker', code: 'DT' }
   
    
];
// for MultiSelect selectbox 








  const [members, setMembers] = useState(initialMembers);
  const [teams, setTeams] = useState(initialTeams);
  const [activeTab, setActiveTab] = useState('all');

  const getTeamFreeMembers = () => {
    const assignedIds = Object.values(teams).flat().map(m => m.id);
    return members.filter(m => !assignedIds.includes(m.id));
  };

  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    if (destination.droppableId === 'members') return; // don't allow dropping back here via DnD

    const draggedMember = members.find(m => m.id === draggableId);
    const isAlreadyInTeam = Object.values(teams).flat().some(m => m.id === draggedMember?.id);
    if (!draggedMember || isAlreadyInTeam) return;

    const updatedTeam = [...teams[destination.droppableId], draggedMember];
    setTeams({
      ...teams,
      [destination.droppableId]: updatedTeam
    });

    setMembers(prev => prev.filter(m => m.id !== draggableId));
  };

  const handleRemoveFromTeam = (teamKey, memberId) => {
    const updatedTeam = teams[teamKey].filter(m => m.id !== memberId);
    const removedMember = teams[teamKey].find(m => m.id === memberId);

    setTeams({
      ...teams,
      [teamKey]: updatedTeam
    });

    setMembers(prev => [...prev, removedMember]);
  };

  const renderMemberCard = (member, index) => (
    <Draggable key={member.id} draggableId={member.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="mb-2 p-2 border rounded d-flex align-items-center bg-white"
        >
          <div
            className="bg-primary text-white rounded-circle d-flex justify-content-center align-items-center me-2"
            style={{ width: 40, height: 40 }}
          >
            {member.initials}
          </div>
          <span>{member.name}</span>
        </div>
      )}
    </Draggable>
  );

  return (
    <div className="py-5 container">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Row>
        <div className="card flex flex-col gap-4 items-start w-full max-w-md">
            <MultiSelect
                value={selectedCities}
                options={cities}
                onChange={(e) => setSelectedCities(e.value)}
                optionLabel="name"
                placeholder="Select Cities"
                filter
                display="chip"
                className="w-full"
            />
            <Button label="Add" icon="pi pi-plus" onClick={handleAddCities} />

            {addedCities.length > 0 && (
                <div className="mt-4 w-full">
                    <div className="flex justify-between items-center mb-2">
                        <h4>Added Cities:</h4>
                        <Button
                            label="Clear All"
                            icon="pi pi-trash"
                            className="p-button-danger p-button-sm"
                            onClick={handleClearAll}
                        />
                    </div>
                    <ul className="list-disc pl-5 space-y-1">
                        {addedCities.map((city) => (
                            <li key={city.code} className="flex justify-between items-center">
                                <span>{city.name}</span>
                                <Button
                                    icon="pi pi-times"
                                    className="p-button-text p-button-sm p-button-danger"
                                    onClick={() => handleRemoveCity(city.code)}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>

          <Col md={8}>
            {Object.keys(teams).map((teamKey) => (
              <Card className="mb-4" key={teamKey}>
                <Card.Header className="d-flex justify-content-between">
                  <strong>{teamKey.charAt(0).toUpperCase() + teamKey.slice(1)}</strong>
                  <small className="text-muted">👥 {teams[teamKey].length}</small>
                </Card.Header>
                <Droppable droppableId={teamKey} direction="horizontal">
                  {(provided) => (
                    <Card.Body
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      style={{ minHeight: '100px', background: '#f7f2f2' }}
                      className="d-flex flex-wrap align-items-center"
                    >
                      {teams[teamKey].map((member, index) => (
                        <Draggable key={member.id} draggableId={member.id} index={index}>
                          {(provided) => (
                            <div
                              className="position-relative m-2"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div
                                className="bg-light p-2 rounded text-center"
                                style={{ width: 80 }}
                              >
                                <div
                                  className="bg-primary text-white rounded-circle mb-1"
                                  style={{
                                    width: 40,
                                    height: 40,
                                    lineHeight: '40px',
                                    margin: '0 auto'
                                  }}
                                >
                                  {member.initials}
                                </div>
                                <small>{member.name}</small>
                              </div>
                              <Button
                                size="sm"
                                variant="danger"
                                onClick={() => handleRemoveFromTeam(teamKey, member.id)}
                                className="position-absolute top-0 end-0 translate-middle p-1 rounded-circle"
                              >
                                ×
                              </Button>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </Card.Body>
                  )}
                </Droppable>
              </Card>
            ))}
          </Col>

          <Col md={4}>
            <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-3">
              <Tab eventKey="all" title="All Members">
                <Droppable droppableId="members">
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="bg-light p-3 rounded"
                      style={{ minHeight: '300px' }}
                    >
                      {members.map((member, index) => renderMemberCard(member, index))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </Tab>

              <Tab eventKey="teamfree" title="Team-free Members">
                <Droppable droppableId="members">
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="bg-light p-3 rounded"
                      style={{ minHeight: '300px' }}
                    >
                      {getTeamFreeMembers().map((member, index) => renderMemberCard(member, index))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </DragDropContext>
    </div>
  );
}
