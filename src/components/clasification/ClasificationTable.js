import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setActiveClasification, startDeleteClasification } from '../../redux/actions/clasification';
import { showClassificationModal } from '../../redux/actions/ui';

export const ClasificationTable = () => {
    const dispatch = useDispatch();
    const {clasifications} = useSelector(state => state.clasification);

    const handleEdit = (clasification) => {
        dispatch(setActiveClasification(clasification));
        dispatch(showClassificationModal());
    }

    const handleDelete = (clasificationId) => {
        dispatch(startDeleteClasification(clasificationId));
    }

    const renderItems = clasifications.map(c => {
        return(
            <tr key={c._id}>
                    <td >{c.name}</td>
                    <td>
                        <FontAwesomeIcon onClick={() => handleEdit(c)} className="table__action-primary"  icon={faEdit}/>
                        <FontAwesomeIcon onClick={() => handleDelete(c._id)} className="table__action-danger ml-1"  icon={faTrash}/>
                    </td>
            </tr>
        )
    })


    return (
        <div className="page__table-container">
        <table className="table__app">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {renderItems}
            </tbody>
        </table>
    </div>
    )
}
