import { useEffect, useState } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import IssueList from '../Issue/IssueList'

const reorder = (list, startIndex, endIndex) => {
  const result = [...list]
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source)
  const destClone = Array.from(destination)
  const [removed] = sourceClone.splice(droppableSource.index, 1)

  destClone.splice(droppableDestination.index, 0, removed)

  const result = {}
  result[droppableSource.droppableId] = sourceClone
  result[droppableDestination.droppableId] = destClone

  return result
}

function Workflows(props) {
  const [workflows, setWorkflows] = useState([])

  useEffect(() => {
    setWorkflows(props.workflows)
  }, [props.workflows])

  const onDragEnd = result => {
    const { source, destination } = result

    // dropped outside the list
    if (!destination) return

    const sId = source.droppableId
    const dId = destination.droppableId

    if (sId === dId) {
      const index = workflows.findIndex(workflow => workflow._id === sId)
      const list = reorder(workflows[index].issues, source.index, destination.index)
      const newState = [...workflows]
      newState[index].issues = list
      setWorkflows(newState)
    } else {
      const sIndex = workflows.findIndex(workflow => workflow._id === sId)
      const dIndex = workflows.findIndex(workflow => workflow._id === dId)

      const result = move(workflows[sIndex].issues, workflows[dIndex].issues, source, destination)
      const newState = [...workflows]
      newState[sIndex].issues = result[sId]
      newState[dIndex].issues = result[dId]
      setWorkflows(newState)
    }
  }

  return (
    <div className="flex">
      <DragDropContext onDragEnd={onDragEnd}>
        {workflows.map((workflow, index) => (
          <Droppable key={workflow._id} droppableId={workflow._id}>
            {(provided, snapshot) => (
              <div ref={provided.innerRef}>
                <IssueList
                  name={workflow.name}
                  projectKey={workflow.projectKey}
                  workflowID={workflow._id}
                  issues={workflow.issues}
                  index={index}
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  )
}

export default Workflows
