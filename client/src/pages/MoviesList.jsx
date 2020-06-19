import React, { Component } from 'react'
import ReactTable from 'react-table'
import api from '../api'
import { Table } from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components'

// import 'react-table/react-table.css'



const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`

class UpdateMovie extends Component {
    updateUser = event => {
        event.preventDefault()
debugger
        // window.location.href = `/movies/update/${this.props.id}`
        this.props.history.push(`/movies/update/${this.props.id}`);
    }

    render() {
        return <Update onClick={this.updateUser}>Update</Update>
    }
}

class DeleteMovie extends Component {
    deleteUser = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Do tou want to delete the movie ${this.props.id} permanently?`,
            )
        ) {
            api.deleteMovieById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <Delete onClick={this.deleteUser}>Delete</Delete>
    }
}

class MoviesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })
        await api.getAllMovies().then(movies => {
            this.setState({
                movies: movies.data.data,
                isLoading: false,
            })
        })
    }

    componentDidUpdate(prevPropes) {
        if(this.props.location !== undefined && this.props.location.state!== undefined && this.props.location.state.showToaster === true) {
            this.notify()
        }
    }

    notify = () => (toast("Wow so easy !"))

    render() {
        const { movies, isLoading } = this.state

        const columns = [
            {
                Header: 'ID',
                accessor: '_id',
                filterable: true,
            },
            {
                Header: 'Name',
                accessor: 'name',
                filterable: true,
            },
            {
                Header: 'Rating',
                accessor: 'rating',
                filterable: true,
            },
            {
                Header: 'Time',
                accessor: 'time',
                Cell: props => <span>{props.value.join(' / ')}</span>,
            },
            {
                Header: '',
                accessor: '',
                Cell: function (props) {
                    return (
                        <span>
                            <DeleteMovie id={props.original._id} />
                        </span>
                    )
                },
            },
            {
                Header: '',
                accessor: '',
                Cell: function (props) {
                    return (
                        <span>
                            <UpdateMovie id={props.original._id} />
                        </span>
                    )
                },
            },
        ]

        let showTable = true
        if (!movies.length) {
            showTable = false
        }

        console.log('TCL: MoviesList -> render -> movies', showTable, movies, columns)

        return (
            <Wrapper style={{paddingBottom: "10px"}} >
                {showTable && (
                    <>
{this.props.location !== undefined && this.props.location.state !== undefined && this.props.location.state.showToaster &&
                    <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    />
}
                        <Table striped bordered hover >

                            <thead>
                                <tr style={{backgroundColor: "#565651"}}>
                                    <th style={{color: "white"}} scope="col"  >#</th>
                                    {columns.length > 0 &&
                                        columns.map(column => (
                                            <th style={{color: "white"}} scope="col">{column.Header}</th>
                                        ))
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {movies.length > 0 &&
                                    movies.map((movie, index) => (
                                        <tr>
                                            <th scope="row">{index}</th>
                                            <td>{movie._id}</td>
                                            <td>{movie.name}</td>
                                            <td>{movie.rating}</td>
                                            <td>{movie.time[0]}</td>
                                            <td><DeleteMovie id={movie._id} history={this.props.history}/></td>
                                            <td><UpdateMovie id={movie._id} history={this.props.history} /></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table >
                    </>
                )}
            </Wrapper>
        )
    }
}

export default withRouter(MoviesList)