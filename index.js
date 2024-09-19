const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
const sequelize = require('./lib/sequelize');

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected and synchronized.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
sequelize.sync();

const { Employee, EmployeeDepartment, EmployeeRole } = require('./models');
const {
  getEmployeeWithAssociations,
} = require('./controlleres/helperFunction');

app.get('/', (req, res) => {
  res.json('WELCOME BD BACKEND');
});

// Endpoint to get all employees with their departments and roles
app.get('/employees', async (req, res) => {
  const employees = await Employee.findAll();

  const employeesWithDetails = [];
  for (let employeeData of employees) {
    const detailedEmployee = await getEmployeeWithAssociations(employeeData);
    employeesWithDetails.push(detailedEmployee);
  }

  return res.json({ employees: employeesWithDetails });
});

// Endpoint to get employee by ID with their departments and roles
app.get('/employees/details/:id', async (req, res) => {
  const employeeData = await Employee.findByPk(req.params.id);
  if (!employeeData) {
    return res.status(404).send({ message: 'Employee not found' });
  }

  const detailedEmployee = await getEmployeeWithAssociations(employeeData);
  return res.json({ employee: detailedEmployee });
});

// Endpoint to get employees by department
app.get('/employees/department/:departmentId', async (req, res) => {
  const employeeDepartments = await EmployeeDepartment.findAll({
    where: { departmentId: req.params.departmentId },
  });

  const employeesWithDetails = [];
  for (let empDep of employeeDepartments) {
    const employeeData = await Employee.findByPk(empDep.employeeId);
    const detailedEmployee = await getEmployeeWithAssociations(employeeData);
    employeesWithDetails.push(detailedEmployee);
  }

  return res.json({ employees: employeesWithDetails });
});

// Endpoint to get employees by role
app.get('/employees/role/:roleId', async (req, res) => {
  const employeeRoles = await EmployeeRole.findAll({
    where: { roleId: req.params.roleId },
  });

  const employeesWithDetails = [];
  for (let empRole of employeeRoles) {
    const employeeData = await Employee.findByPk(empRole.employeeId);
    const detailedEmployee = await getEmployeeWithAssociations(employeeData);
    employeesWithDetails.push(detailedEmployee);
  }

  return res.json({ employees: employeesWithDetails });
});

// Endpoint to get employees sorted by name
app.get('/employees/sort-by-name', async (req, res) => {
  const order = req.query.order || 'ASC';
  const employees = await Employee.findAll({ order: [['name', order]] });

  const employeesWithDetails = [];
  for (let employeeData of employees) {
    const detailedEmployee = await getEmployeeWithAssociations(employeeData);
    employeesWithDetails.push(detailedEmployee);
  }

  return res.json({ employees: employeesWithDetails });
});

// Endpoint to add a new employee and associate with departments and roles
app.post('/employees/new', async (req, res) => {
  const { name, email, departmentId, roleId } = req.body;

  const employeeData = await Employee.create({ name, email });

  if (departmentId) {
    await EmployeeDepartment.create({
      employeeId: employeeData.id,
      departmentId,
    });
  }

  if (roleId) {
    await EmployeeRole.create({ employeeId: employeeData.id, roleId });
  }

  const detailedEmployee = await getEmployeeWithAssociations(employeeData);
  return res.json({
    message: 'Employee added successfully',
    employee: detailedEmployee,
  });
});

// Endpoint to update employee details and their associations
app.post('/employees/update/:id', async (req, res) => {
  const { name, email, departmentId, roleId } = req.body;
  const employeeData = await Employee.findByPk(req.params.id);

  if (!employeeData) {
    return res.status(404).send({ message: 'Employee not found' });
  }

  if (name) employeeData.name = name;
  if (email) employeeData.email = email;

  await employeeData.save();

  if (departmentId) {
    await EmployeeDepartment.destroy({
      where: {
        employeeId: parseInt(employeeData.id),
      },
    });
    await EmployeeDepartment.create({
      employeeId: employeeData.id,
      departmentId,
    });
  }

  if (roleId) {
    await EmployeeRole.destroy({
      where: { employeeId: employeeData.id },
    });
    await EmployeeRole.create({ employeeId: employeeData.id, roleId });
  }

  const detailedEmployee = await getEmployeeWithAssociations(employeeData);
  return res.json({ employee: detailedEmployee });
});

// Endpoint to delete an employee
app.post('/employees/delete', async (req, res) => {
  try {
    const employeeData = await Employee.findByPk(req.body.id);
    if (!employeeData) {
      return res.status(404).json({ message: 'Employee not found' });
    } else {
      await EmployeeDepartment.destroy({
        where: { employeeId: parseInt(req.body.id) },
      });
      await EmployeeRole.destroy({
        where: { employeeId: parseInt(req.body.id) },
      });
      await employeeData.destroy();

      return res.json({
        message: `Employee with ID ${req.body.id} has been deleted.`,
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log('Server is running on port', PORT));
