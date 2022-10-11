import fetch from 'unfetch';

const checkStatus = response => {
    if(response.ok){
        return response;
    }
    let error = new Error(response.statusText);
    error.response = response;
    response.json().then(e=>{
        error.error = e;
    })
    return Promise.reject(error);
}

export const getAllStudent = () => 
    fetch('/api/students').then(checkStatus);
export const addStudent = (student) => fetch('/api/students', {
    headers: {
        'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(student)
}).then(checkStatus);