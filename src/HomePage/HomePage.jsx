import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
import EmployeeList from '../_components/EmployeeListComponent';
import { Accordion, Button, Card } from 'react-bootstrap';
import styles from '../styles/Styles';

class HomePage extends React.Component {
    constructor(){
        super();
        this.state = {
            openCursor : '+'
        }
    }
    componentDidMount() {
        this.props.getUsers(); 
       
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }

    cursorPositioning(){
        if(this.state.openCursor == "+"){
            this.setState({
                openCursor : '-'
          });
        }else{
            this.setState({
                openCursor : '+'
          });
        }
    }

    render() {
        const { user, users } = this.props;
        return (
            <div className="container">
                <div className="flex-row">
                    <p style={{ "float": "right" }}>
                        <Link to="/login">Logout</Link>
                    </p>
                    <label > <i> Hi {user.firstName} ! , Good Day ! ! ! </i></label>
                </div>
                <br />
                <br />
                <br />
                <label> (Functionality can be added like - if admin only can be seen the Registered Users)</label>
                <Accordion >
                    <Card style={styles.accordion} >
                        <Card.Header>
                            <Accordion.Toggle as={Button} style={{ "border": "2px solid grey " }} onClick={()=> {this.cursorPositioning()}} variant="link" eventKey="0">
                                <h5 >All registered users {this.state.openCursor}</h5>
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0" >
                            <Card.Body style={styles.panel}>
                                <div className="row flex-row">
                                    {users.loading && <em>Loading users...</em>}
                                    {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                                    {users.items &&
                                        <ul>
                                            {users.items.map((user, index) =>
                                                <li key={user.id}>
                                                    {user.firstName + ' ' + user.lastName}
                                                    {
                                                        user.deleting ? <em> - Deleting...</em>
                                                            : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                                                : <span> - <a onClick={this.handleDeleteUser(user.id)}>Delete</a></span>
                                                    }
                                                </li>
                                            )}
                                        </ul>
                                    }
                                </div>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
                <EmployeeList />
            </div>
          
        );
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };


  