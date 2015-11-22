//
'use strict';
var employees = [{name:'Yaser', serviceyears:2, present:'yes', annualvacation:21},
                 {name:'Khaled', serviceyears:5, present:'no', annualvacation:21},
                 {name:'Gamal', serviceyears:7, present:'yes', annualvacation:21}];

var ret;

//array.every(callback)
//returns true only if the callback function returns true for all array elements.
//Are all employees present ?
ret = employees.every(employee => employee.present == 'yes');
//ret = false

//array.filter(callback)
//returns a filtered copy of the array with all elements that when passed to the the callback function returns true.
//Give me all employees whose service years are greater than 5 years
ret = employees.filter(employee => employee.serviceyears > 5);
//ret =[{name:'Gamal', serviceyears:7, present:'yes', annualvacation:21}]

//array.sort(callback)
//sorts the array and returns a copy, it uses the callback function while sorting.
//sort employees descending based on number of years in service
ret = employees.sort((employee_a, employee_b) => employee_a.serviceyears < employee_b.serviceyears);
//ret =  [{name:'Gamal', serviceyears:7, present:'yes', annualvacation:21},
//        {name:'Khaled', serviceyears:5, present:'no', annualvacation:21},
//        {name:'Yaser', serviceyears:2, present:'yes', annualvacation:21}];

//array.forEach(callback)
//performs the call back function on every element in the array
//Set annual vacation to 30 days for all employees whose service years are greater than 5
employees.forEach(employee => { if (employee.serviceyears > 5) employee.annualvacation = 30;});
//employees = [{name:'Gamal', serviceyears:7, present:'yes', annualvacation:30},
//             {name:'Khaled', serviceyears:5, present:'no', annualvacation:21},
//             {name:'Yaser', serviceyears:2, present:'yes', annualvacation:21}];

//array.find(callback)
//finds an element in the array that satisfies the criteria defined in the callback function.
//Get the employee record whose name is Yasser
ret = employees.find(employee => employee.name == 'Yaser');
//ret = {name: "Yaser", serviceyears: 2, present: "yes", annualvacation: 21}

//array.findIndex(callback)
//finds the index of an element in the array that satisfies the criteria defined in the callback function.
//Get index of the employee record whose name is Yasser
ret = employees.findIndex(employee => employee.name == 'Yaser');
//ret = 2

//array.map(callback)
//similar to forEach, but it returns a new array instead of modifying the same array.
//Set annual vacation to 15 days for all employees whose service years are less than 5
ret = employees.map(employee => { if (employee.serviceyears <= 5)
                                                    employee.annualvacation = 15;
                                  return employee;
                          });
//ret = [{name:'Gamal', serviceyears:7, present:'yes', annualvacation:30},
//       {name:'Khaled', serviceyears:5, present:'no', annualvacation:15},
//       {name:'Yaser', serviceyears:2, present:'yes', annualvacation:15}];
