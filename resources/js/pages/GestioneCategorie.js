import React, { useState, useEffect } from 'react'
import { useTable, useGroupBy, useFilters, useSortBy, usePagination  } from 'react-table'
import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom";
import Modal from '../components/Modal';

const GestioneCategorie = props => {
    const [data, setData] = useState([])
    const [activeId, setActiveId] = useState(null)
    const [modalOpen, setIsOpen] = useState(false)
    const history = useHistory()

    const openModal = (id = 0) => {
        setIsOpen(true);
        setActiveId(id);
    }

    function closeModal(){
        setIsOpen(false);
    }

    const getProduct = async (response) => {
        response = await fetch('/api/category',{
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : 'Bearer ' + sessionStorage.getItem('token')
            }
        }).then(response => response.json()).
        then(dati => {
            let _data = [];
            dati.map( dato => {
                let _dato = {
                    id: dato.id,
                    name: dato.name,
                    description: dato.description,
                }
                _data.push(_dato);
            })
            setData(_data);
        });
    }

    useEffect(() => { getProduct(); }, []);

    const columns = React.useMemo(
        () => [
        {
            width: 220,
            Header: "Azioni",
            accessor: "id",
            Cell: ({ cell }) => (
                <>
                    <button onClick={() => openModal(cell.row.values.id)} className="btn btn-primary btn-small" /* value={cell.row.values.name} onClick={props.handleClickGroup} */>
                        <svg  viewBox="-47 0 512 512"  xmlns="http://www.w3.org/2000/svg"><path d="m416.875 114.441406-11.304688-33.886718c-4.304687-12.90625-16.339843-21.578126-29.941406-21.578126h-95.011718v-30.933593c0-15.460938-12.570313-28.042969-28.027344-28.042969h-87.007813c-15.453125 0-28.027343 12.582031-28.027343 28.042969v30.933593h-95.007813c-13.605469 0-25.640625 8.671876-29.945313 21.578126l-11.304687 33.886718c-2.574219 7.714844-1.2695312 16.257813 3.484375 22.855469 4.753906 6.597656 12.445312 10.539063 20.578125 10.539063h11.816406l26.007813 321.605468c1.933594 23.863282 22.183594 42.558594 46.109375 42.558594h204.863281c23.921875 0 44.175781-18.695312 46.105469-42.5625l26.007812-321.601562h6.542969c8.132812 0 15.824219-3.941407 20.578125-10.535157 4.753906-6.597656 6.058594-15.144531 3.484375-22.859375zm-249.320312-84.441406h83.0625v28.976562h-83.0625zm162.804687 437.019531c-.679687 8.402344-7.796875 14.980469-16.203125 14.980469h-204.863281c-8.40625 0-15.523438-6.578125-16.203125-14.980469l-25.816406-319.183593h288.898437zm-298.566406-349.183593 9.269531-27.789063c.210938-.640625.808594-1.070313 1.484375-1.070313h333.082031c.675782 0 1.269532.429688 1.484375 1.070313l9.269531 27.789063zm0 0"/><path d="m282.515625 465.957031c.265625.015625.527344.019531.792969.019531 7.925781 0 14.550781-6.210937 14.964844-14.21875l14.085937-270.398437c.429687-8.273437-5.929687-15.332031-14.199219-15.761719-8.292968-.441406-15.328125 5.925782-15.761718 14.199219l-14.082032 270.398437c-.429687 8.273438 5.925782 15.332032 14.199219 15.761719zm0 0"/><path d="m120.566406 451.792969c.4375 7.996093 7.054688 14.183593 14.964844 14.183593.273438 0 .554688-.007812.832031-.023437 8.269531-.449219 14.609375-7.519531 14.160157-15.792969l-14.753907-270.398437c-.449219-8.273438-7.519531-14.613281-15.792969-14.160157-8.269531.449219-14.609374 7.519532-14.160156 15.792969zm0 0"/><path d="m209.253906 465.976562c8.285156 0 15-6.714843 15-15v-270.398437c0-8.285156-6.714844-15-15-15s-15 6.714844-15 15v270.398437c0 8.285157 6.714844 15 15 15zm0 0"/></svg>
                    </button>
                    <button className="btn btn-primary btn-small" onClick={() => history.push('/gestione/categoria/' + cell.row.values.id)}>
                        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
	 viewBox="0 0 477.873 477.873" style={{enableBackground : 'new 0 0 477.873 477.873'}} >
<g>
	<g>
		<path d="M392.533,238.937c-9.426,0-17.067,7.641-17.067,17.067V426.67c0,9.426-7.641,17.067-17.067,17.067H51.2
			c-9.426,0-17.067-7.641-17.067-17.067V85.337c0-9.426,7.641-17.067,17.067-17.067H256c9.426,0,17.067-7.641,17.067-17.067
			S265.426,34.137,256,34.137H51.2C22.923,34.137,0,57.06,0,85.337V426.67c0,28.277,22.923,51.2,51.2,51.2h307.2
			c28.277,0,51.2-22.923,51.2-51.2V256.003C409.6,246.578,401.959,238.937,392.533,238.937z"/>
	</g>
</g>
<g>
	<g>
		<path d="M458.742,19.142c-12.254-12.256-28.875-19.14-46.206-19.138c-17.341-0.05-33.979,6.846-46.199,19.149L141.534,243.937
			c-1.865,1.879-3.272,4.163-4.113,6.673l-34.133,102.4c-2.979,8.943,1.856,18.607,10.799,21.585
			c1.735,0.578,3.552,0.873,5.38,0.875c1.832-0.003,3.653-0.297,5.393-0.87l102.4-34.133c2.515-0.84,4.8-2.254,6.673-4.13
			l224.802-224.802C484.25,86.023,484.253,44.657,458.742,19.142z M434.603,87.419L212.736,309.286l-66.287,22.135l22.067-66.202
			L390.468,43.353c12.202-12.178,31.967-12.158,44.145,0.044c5.817,5.829,9.095,13.72,9.12,21.955
			C443.754,73.631,440.467,81.575,434.603,87.419z"/>
	</g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>
</svg>

                    </button>
                </>
        )},
          {
            Header: 'Nome',
            accessor: 'name',
          },
          {
            Header: 'Descrizione',
            accessor: 'description',
          },
        ],
        []
      )

      const tableInstance = useTable({ columns, data },
        useSortBy,
        usePagination)


      const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
      } = tableInstance


    return (
        <div>
            <Modal
                isOpen={modalOpen}
                onRequestClose={closeModal}
                id={activeId}
                setModal = {setIsOpen}
                type="category"
                refresh={getProduct}
                />
            { !props.is_page && ( 
                <>
                    <h1>Gestione Categorie</h1>
                    <Link to="/gestione/categorie/nuova" className='btn btn-primary btn-add'>
                        <svg  viewBox="0 0 448 448"  xmlns="http://www.w3.org/2000/svg">
                            <path d="m408 184h-136c-4.417969 0-8-3.582031-8-8v-136c0-22.089844-17.910156-40-40-40s-40 17.910156-40 40v136c0 4.417969-3.582031 8-8 8h-136c-22.089844 0-40 17.910156-40 40s17.910156 40 40 40h136c4.417969 0 8 3.582031 8 8v136c0 22.089844 17.910156 40 40 40s40-17.910156 40-40v-136c0-4.417969 3.582031-8 8-8h136c22.089844 0 40-17.910156 40-40s-17.910156-40-40-40zm0 0"/>
                        </svg>
                        <span>Aggiungi Categoria</span>
                    </Link>
                </> ) }
            <div className="row">
                <div className="col-lg-12">
                    <table {...getTableProps()}>
                        <thead>
                        {// Loop over the header rows
                        headerGroups.map(headerGroup => (
                            // Apply the header row props
                            <tr {...headerGroup.getHeaderGroupProps()}>
                            {// Loop over the headers in each row
                            headerGroup.headers.map(column => (
                                // Apply the header cell props
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                {// Render the header
                                column.render('Header')}
                                <span>
                                    {column.isSorted
                                    ? column.isSortedDesc
                                        ? ' <'
                                        : ' >'
                                    : ''}
                                </span>
                                </th>
                            ))}
                            </tr>
                        ))}
                        </thead>
                        {/* Apply the table body props */}
                        <tbody {...getTableBodyProps()}>
                        {// Loop over the table rows
                        rows.map(row => {
                            // Prepare the row for display
                            prepareRow(row)
                            return (
                            // Apply the row props
                            <tr {...row.getRowProps()}>
                                {// Loop over the rows cells
                                row.cells.map(cell => {
                                // Apply the cell props
                                return (
                                    <td {...cell.getCellProps()}>
                                    {// Render the cell contents
                                    cell.render('Cell')}
                                    </td>
                                )
                                })}
                            </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}


export default GestioneCategorie;