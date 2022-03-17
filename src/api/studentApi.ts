import { ListParams, ListResponseParams, Student } from 'models';
import axiosClient from './axiosClient';

const studentApi = {
  getAll(params: ListParams): Promise<ListResponseParams<Student>> {
    const url = '/students';

    return axiosClient.get(url, {
      params,
    });
  },

  getById(id: string): Promise<any> {
    const url = `/students/${id}`;

    return axiosClient.get(url);
  },

  addStudent(data: Student): Promise<Student> {
    const url = '/students';

    return axiosClient.post(url, data);
  },

  updateStudent(data: Student): Promise<Student> {
    const url = '/students';

    return axiosClient.patch(url, data);
  },

  removeStudent(id: string): Promise<any> {
    const url = `/students/${id}`;

    return axiosClient.delete(url);
  },
};

export default studentApi;