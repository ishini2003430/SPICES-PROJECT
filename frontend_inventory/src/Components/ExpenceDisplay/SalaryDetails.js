import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SalaryDetails = () => {
  const { id } = useParams();
  const [salary, setSalary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalary = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/salaries/${id}`);
        if (res.data && (res.data.salary || res.data)) {
          setSalary(res.data.salary || res.data);
          setLoading(false);
        } else {
          setError('No salary data found');
          setLoading(false);
        }
      } catch (err) {
        console.error('Error fetching salary:', err);
        setError(err.response?.data?.message || 'Failed to fetch salary details.');
        setLoading(false);
      }
    };
    fetchSalary();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!salary) return <div>No salary details found.</div>;

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', background: '#fff', padding: 24, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <h2>Salary Details</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 16 }}>
        <tbody>
          <tr>
            <th style={{ textAlign: 'left', padding: 8 }}>Employee ID</th>
            <td style={{ padding: 8 }}>{salary.EmployeeId}</td>
          </tr>
          <tr>
            <th style={{ textAlign: 'left', padding: 8 }}>Name</th>
            <td style={{ padding: 8 }}>{salary.stakeholderName}</td>
          </tr>
          <tr>
            <th style={{ textAlign: 'left', padding: 8 }}>Email</th>
            <td style={{ padding: 8 }}>{salary.email}</td>
          </tr>
          <tr>
            <th style={{ textAlign: 'left', padding: 8 }}>Month</th>
            <td style={{ padding: 8 }}>{salary.month}</td>
          </tr>
          <tr>
            <th style={{ textAlign: 'left', padding: 8 }}>Basic Salary</th>
            <td style={{ padding: 8 }}>Rs. {salary.basicSalary.toFixed(2)}</td>
          </tr>
          <tr>
            <th style={{ textAlign: 'left', padding: 8 }}>Allowances</th>
            <td style={{ padding: 8 }}>Rs. {salary.allowances.toFixed(2)}</td>
          </tr>
          <tr>
            <th style={{ textAlign: 'left', padding: 8 }}>Deductions</th>
            <td style={{ padding: 8 }}>Rs. {salary.loanDeduction.toFixed(2)}</td>
          </tr>
          <tr>
            <th style={{ textAlign: 'left', padding: 8 }}>Net Salary</th>
            <td style={{ padding: 8, fontWeight: 700 }}>Rs. {salary.netSalary.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SalaryDetails;
