import { API_URL } from "@/constants/api";
import axios from "axios";

export interface Lesson {
  id: string;
  title: string;
  description: string;
}

export const createLesson = async (lesson: Lesson) => {
  try {
    const response = await axios.post(`${API_URL}/createLesson`, lesson);
    return response.data;
  } catch (error) {
    console.error('Error creating lesson:', error);
    throw new Error('Failed to create lesson');
  }
}

export const getAllLessons = async () => {
  try {
    const response = await axios.get(`${API_URL}/lessons`);
    return response.data.lessons;
  } catch (error) {
    console.error('Error fetching all lessons:', error);
    throw new Error('Failed to fetch all lessons');
  }
}

export const assignLessonToStudent = async (lessonId: string, studentPhone: string) => {
  try {
    const response = await axios.post(`${API_URL}/assignLesson`, { lessonId, studentPhone });
    return response.data.lesson;
  } catch (error) {
    console.error('Error assigning lesson to student:', error);
    throw new Error('Failed to assign lesson to student');
  }
}

export const deleteLesson = async (lessonId: string) => {
  try {
    await axios.delete(`${API_URL}/myLessons/${lessonId}`);
  } catch (error) {
    console.error('Error deleting lesson:', error);
    throw new Error('Failed to delete lesson');
  }
};
