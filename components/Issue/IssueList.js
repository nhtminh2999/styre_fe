import { Draggable } from 'react-beautiful-dnd'
import EditableField from '../EditableField'
import IssueCreate from './IssueCreate'
import IssueItem from './IssueItem'

const getItemStyle = (isDragging, draggableStyle) => {
  return {
    marginBottom: '5px',
    borderRadius: '3px',
    boxShadow: '#091e4240 0px 1px 2px 0px',
    // change background colour if dragging
    background: 'white',
    transform: isDragging && `rotate(20deg)`,
    // styles we need to apply on draggables
    ...draggableStyle
  }
}

function IssueList({ projectKey, workflowID, name, issues = [] }) {
  return (
    <div className="flex flex-col flex-[1_1_auto] min-w-[282px] max-w-[282px] h-full">
      <div className="flex flex-col flex-[1_1_auto] px-1.5 rounded-md bg-[#F4F5F7] min-w-[270px] max-w-[270px] mx-[6px]">
        <div className="h-12 flex flex-col justify-center ">
          <EditableField issueListname={name} quantity={issues.length} />
        </div>
        {issues.map((issue, index) => (
          <Draggable key={issue._id} draggableId={issue._id.toString()} index={index}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
              >
                <IssueItem shortSummary={issue.shortSummary} />
              </div>
            )}
          </Draggable>
        ))}
        <IssueCreate workflowID={workflowID} projectKey={projectKey} />
      </div>
    </div>
  )
}

export default IssueList
