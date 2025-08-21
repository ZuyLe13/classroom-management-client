import { API_URL } from "@/constants/api";
import axios from "axios";

export interface Student {
  name: string;
  email: string;
  phone: string;
  role: string;
  address: string;
  message?: string;
}

export const getStudents = async () => {
  try {
    const response = await axios.get(`${API_URL}/students`);
    return response.data.students;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw new Error('Failed to fetch students');
  }
};

export const addStudent = async (student: Student) => {
  try {
    const response = await axios.post(`${API_URL}/addStudent`, student);
    return response.data;
  } catch (error) {
    console.error('Error adding student:', error);
    throw new Error('Failed to add student');
  }
};

export const updateStudent = async (phone: string, student: Student) => {
  try {
    const response = await axios.put(`${API_URL}/editStudent/${phone}`, student);
    return response.data;
  } catch (error) {
    console.error('Error updating student:', error);
    throw new Error('Failed to update student');
  }
}

export const deleteStudent = async (phone: string) => {
  try {
    await axios.delete(`${API_URL}/student/${phone}`);
  } catch (error) {
    console.error('Error deleting student:', error);
    throw new Error('Failed to delete student');
  }
};

export const getStudentLessons = async (phone: string) => {
  try {
    const response = await axios.get(`${API_URL}/myLessons/${phone}`);
    return response.data.lessons;
  } catch (error) {
    console.error('Error fetching student lessons:', error);
    throw new Error('Failed to fetch student lessons');
  }
};

export const updateStudentLesson = async (phone: string, lessonId: string, completed: boolean) => {
  try {
    const response = await axios.put(`${API_URL}/myLessons/${phone}/${lessonId}`, { completed });
    return response.data;
  } catch (error) {
    console.error('Error updating student lesson:', error);
    throw new Error('Failed to update student lesson');
  }
};