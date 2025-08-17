import { API_URL } from "@/constants/api";
import axios from "axios";

export interface Student {
  name: string;
  email: string;
  phone: string;
  role: string;
  address: string;
}

export const getStudents = async () => {
  try {
    const response = await axios.get(`${API_URL}/students`);
    return response.data.students;
  } catch (error) {
    console.error('Error fetching students:', error);
    return [];
  }
};

export const addStudent = async (student: Student) => {
  try {
    const response = await axios.post(`${API_URL}/addStudent`, student);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding student:', error);
    return null;
  }
};
