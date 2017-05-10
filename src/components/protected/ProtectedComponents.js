import React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import Header from '../Header';
import FacultyComponents from './faculty-users/FacultyComponents';
import StudentComponents from './student-users/StudentComponents';

export default ProtectedComponents = (props) => {
    const {fullName, userType} = props.currentUser;
    console.log("accessed Protected Components");

    return userType === 'FACULTY' ? <FacultyComponents {...props}/> : <StudentComponents {...props}/>
}