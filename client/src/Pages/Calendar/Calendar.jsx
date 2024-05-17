import React, { useState } from 'react'
import Calendar from 'react-calendar';
import "./Calendar.css"
import "./todo.css"
import "./mediaQueries.css"
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DeleteIcon from '@mui/icons-material/Delete';
import { useUserInfo } from '../../contexts/user';
import useToDoChange from '../../hooks/useToDoChange.js';



import { handleSubmit, handleCheckBoxClick, handleDeletion } from './handlers.js';
import useDateChange from '../../hooks/useDateChange.js';

function CalendarComp() {
  const [listItems, setListItems] = useState([]);
  const {
    todoItem,
    handleTodoChange,
    setTodoItem } = useToDoChange();

  const { date, handleDateChange } = useDateChange(setListItems);
  const { ContextUser } = useUserInfo();
  console.log(listItems);

  return (
    <>
      <div className='calendar-container'>

        <div>
          <Calendar
            value={date}
            onChange={handleDateChange}
          />
        </div>

        <div className='todo-container-1'>
          <div className='todo-container'>
            <div className='date'>
              <p>
                {date.toDateString()}
              </p>
            </div>
            <div className='to-do'>
              <div className='text-area'>
                <input
                  value={todoItem}
                  name='todoItem'
                  placeholder='Add Item'
                  spellCheck={false}
                  onChange={handleTodoChange}
                />

                <div className='add-icon' onClick={() => {
                  handleSubmit(date, setListItems, ContextUser, todoItem, setTodoItem)
                }}>

                  <AddOutlinedIcon className='plus' />

                </div>

              </div>

              <div className='item-container'>
                {
                  listItems?.map((item, index) => {
                    return (
                      (!item.done) ?
                        <div key={index} id={index} className='todo-items'>
                          <div className='todo-items-i'>

                            <CheckBoxOutlineBlankIcon
                              onClick={() => {
                                handleCheckBoxClick(item._id, setListItems, ContextUser, date)
                              }}
                              className='check-boxes'
                            />

                            <p>{item.item}</p>

                          </div>
                          <DeleteIcon className='delete-icon'
                            onClick={() => {
                              handleDeletion(item._id, setListItems, ContextUser, date)
                            }} />
                        </div>
                        : null
                    )
                  })
                }
              </div>

              <br /><br />

              <div className='item-container'>
                {
                  listItems?.map((item, index) => {
                    return (
                      (item.done) ?
                        <div key={index} id={index} className='todo-items'>
                          <div className='todo-items-i'>

                            <CheckBoxIcon
                              onClick={() => {
                                handleCheckBoxClick(item._id, setListItems, ContextUser, date)
                              }}
                              className='check-boxes'
                            />

                            <p style={{ textDecoration: "line-through" }}>{item.item}</p>

                          </div>
                          <DeleteIcon className='delete-icon'
                            onClick={() => {
                              handleDeletion(item._id, setListItems, ContextUser, date)
                            }} />
                        </div>
                        : null
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default CalendarComp