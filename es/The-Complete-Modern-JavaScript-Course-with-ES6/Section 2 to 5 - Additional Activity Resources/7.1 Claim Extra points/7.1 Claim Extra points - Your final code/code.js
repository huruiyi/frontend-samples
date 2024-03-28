//create objects for students
var student1 = {
    name: 'Mark',
    grade: 80
};
var student2 = {
    name: 'John',
    grade: 75
};
var student3 = {
    name: 'Sara',
    grade: 90
};

//calculate the average
var average = (student1.grade + student2.grade + student3.grade)/3;
average = average.toFixed(2);
console.log(average);

//add more points to Mark
var extra = 15;
student1.grade += extra;
console.log(student1);