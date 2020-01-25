import React from 'react';
import styles from '../../styles/Styles';

export class HeaderComponent extends React.Component {
    constructor() {
        super();
    }
    render() {

        return (
            <header style={styles.AppHeader}>
                <h3 style={styles.AppTitle}>Welcome To Employee Management System</h3>
                <label style={{color:"green"}}>This Application is built with React - Redux Architecture - Thunk Middleware</label>
            </header>
        )
    }
}



export default HeaderComponent;