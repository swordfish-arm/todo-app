import React, { useState } from "react"; 
import { 
	View, 
	Image,
	Text,   
	FlatList, 
	StyleSheet, 
} from "react-native"; 

import {Avatar, Card, IconButton,TextInput, PaperProvider,Button , MD3LightTheme} from 'react-native-paper';

const TodoList = () => {
	const [task, setTask] = React.useState(""); 
	const [tasks, setTasks] = React.useState([]); 
	const [editIndex, setEditIndex] = React.useState(-1); 

	const handleAddTask = () => { 
		if (task) { 
			if (editIndex !== -1) { 
				// Edit existing task 
				const updatedTasks = [...tasks]; 
				updatedTasks[editIndex] = task; 
				setTasks(updatedTasks); 
				setEditIndex(-1); 
			} else { 
				// Add new task 
				setTasks([...tasks, task]); 
			} 
			setTask(""); 
		} 
	}; 

	const handleEditTask = (index) => { 
		const taskToEdit = tasks[index]; 
		setTask(taskToEdit); 
		setEditIndex(index); 
	}; 

	const handleDeleteTask = (index) => { 
		const updatedTasks = [...tasks]; 
		updatedTasks.splice(index, 1); 
		setTasks(updatedTasks); 
	}; 

	const renderItem = ({ item, index }) => ( 
		<View style={styles.task}> 
			<Text 
				style={styles.itemList}>{item}</Text> 
			<View 
				style={styles.taskButtons}> 
				<Button 
					icon="application-edit-outline" mode="text" 
					onPress={() => handleEditTask(index)}> 
					<Text 
						style={styles.editButton}>Edit</Text> 
				</Button> 
				<Button 
					icon="delete-alert-outline" mode="text" 
					onPress={() => handleDeleteTask(index)}> 
					<Text 
						style={styles.deleteButton}>Delete</Text> 
				</Button> 
			</View> 
		</View> 
	); 
	
	const theme = {
		...MD3LightTheme,
		roundness: 2,
		colors: { 
		  ...MD3LightTheme.colors, 
		  primary: 'rgb(29, 27, 30)',
		  onPrimary: "white",
		  secondary: "rgb(208, 193, 218)",
		  onSecondary: "white"
		}
	  };

	const styles = StyleSheet.create({ 
		container: { 
			flex: 1, 
			padding: 40, 
			marginTop: 40, 
		}, 
		title: { 
			fontSize: 24, 
			fontWeight: "bold", 
			marginBottom: 20, 
		}, 
		heading: { 
			fontSize: 30, 
			fontWeight: "bold", 
			marginBottom: 7, 
			color: "green", 
		}, 
		input: { 
			borderColor: "#ccc", 
			padding: 10, 
			marginBottom: 10, 
			borderRadius: 10, 
			fontSize: 18, 
		}, 
		addButton: { 
			backgroundColor: "green", 
			icon:"camera",
			padding: 10, 
			borderRadius: 5, 
			marginBottom: 10, 
		}, 
		addButtonText: { 
			color: "white", 
			fontWeight: "bold", 
			textAlign: "center", 
			fontSize: 18, 
		}, 
		task: { 
			flexDirection: "row", 
			justifyContent: "space-between", 
			alignItems: "center", 
			marginBottom: 15, 
			fontSize: 18, 
		}, 
		itemList: { 
			fontSize: 19, 
		}, 
		taskButtons: { 
			flexDirection: "row", 
		}, 
		editButton: { 
			marginRight: 10, 
			color: "blue", 
			fontWeight: "bold", 
			fontSize: 18, 
		}, 
		deleteButton: { 
			color: "red", 
			fontWeight: "bold", 
			fontSize: 18, 
		}, 
	}); 

  return (
    <PaperProvider>
      	<View style={styles.container}> 
		  	<Card>
    			<Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
			  	<Card.Title
				title="ToDo App - EL106"
				left={(props) => <Avatar.Icon {...props} icon="folder" />}
				/>
			</Card>
			<TextInput 
				style={styles.input} 
				mode="outlined"
				placeholder="Type something"
				label="Enter Task"
				value={task} 
				onChangeText={(text) => setTask(text)} 
			/> 
			<Button 
				style={styles.addButton} 
				onPress={handleAddTask}> 
				<Text style={styles.addButtonText}> 
					{editIndex !== -1 ? "Update Task" : "Add Task"} 
				</Text> 
			</Button> 
			<FlatList 
				data={tasks} 
				renderItem={renderItem} 
				keyExtractor={(item, index) => index.toString()} 
			/> 
		</View> 
    </PaperProvider>
  );
};

export default TodoList;
