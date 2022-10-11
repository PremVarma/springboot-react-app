package com.prem.demo.student;

import com.prem.demo.EmailValidator;
import com.prem.demo.exception.ApiRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;


@Service
public class StudentService {

    private StudentDataAceessService studentDataAceessService;
    private final EmailValidator emailValidator;

    @Autowired
    public StudentService(StudentDataAceessService dataAceessService,EmailValidator validator){
        studentDataAceessService = dataAceessService;
        emailValidator = validator;
    }
    public List<Student> getAllStudent()  {
       return studentDataAceessService.selectAllStudent();
    }

    public void addStudent(Student student) {
        addStudent(null,student);
    }
    public void addStudent(UUID studentId, Student student) {
        UUID newStudentId = Optional.ofNullable(studentId).orElse(UUID.randomUUID());
        if(!emailValidator.test(student.getEmail())){
            throw new ApiRequestException(student.getEmail()+ " is not valid email!");
        }
        if(studentDataAceessService.isEmailTaken(student.getEmail())){
            throw new ApiRequestException(student.getEmail()+" is taken!");
        }
        studentDataAceessService.insertStudent(newStudentId,student);
    }

    public List<StudentCourse> getAllCoursesForStudent(UUID studentId) {
        return studentDataAceessService.selectAllCoursesForStudent(studentId);
    }
}
