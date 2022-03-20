import { Box, Typography } from '@material-ui/core';
import { ChevronLeft } from '@material-ui/icons';
import studentApi from 'api/studentApi';
import { Student } from 'models';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import StudentForm from '../components/StudentForm';

export default function AddEditStudentPage() {
  const history = useHistory();
  const { studentId } = useParams<{ studentId: string }>();
  const isEdit = Boolean(studentId);
  const [student, setStudent] = useState<Student>();

  useEffect(() => {
    if (!studentId) return;

    //fetch student detail
    (async () => {
      try {
        const response = await studentApi.getById(studentId);
        setStudent(response);
      } catch (error) {
        console.log('Fetch student detail error', error);
      }
    })();
  }, [studentId]);

  const initialValues: Student = {
    name: '',
    age: 18,
    mark: 0,
    gender: 'male',
    city: '',
    ...student,
  };

  const handleStudentFormSubmit = async (formValue: Student) => {
    //Call api
    if (isEdit) {
      await studentApi.updateStudent(formValue);
    } else {
      await studentApi.addStudent(formValue);
    }

    //Ridirect to list page
    history.push('/admin/students');
  };

  return (
    <Box>
      <Link to="/admin/students">
        <Typography
          variant="caption"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <ChevronLeft /> Back to student list
        </Typography>
      </Link>

      <Typography variant="h4">
        {isEdit ? `Edit student info ` : 'Add new student'}
      </Typography>

      {(!isEdit || Boolean(student)) && (
        <Box mt={3}>
          <StudentForm
            initialValues={initialValues}
            onSubmit={handleStudentFormSubmit}
            isEdit={isEdit}
          />
        </Box>
      )}
    </Box>
  );
}
