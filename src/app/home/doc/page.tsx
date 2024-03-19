'use client'
import './style.css';
import React from 'react';
import { Formik, Form, Field } from 'formik';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface FormValues {
  changeProposedBy: string;
  date: Date | null;
  departmentName: string;
  documentId: string;
  issueNumber: string;
  itemClause: string;
  description: string;
  remarks: string;
  approved: boolean;
}

const DocumentChangePage: React.FC = () => {
  const initialValues: FormValues = {
    changeProposedBy: '',
    date: null,
    departmentName: '',
    documentId: '',
    issueNumber: '',
    itemClause: '',
    description: '',
    remarks: '',
    approved: false,
  };

  return (
    <div>
      <h1>Document Change Request</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          console.log(values);
          actions.setSubmitting(false);
        }}
      >
        {({ setFieldValue }) => (
          <Form>
            <label htmlFor="changeProposedBy">Change Proposed By:</label>
            <Field id="changeProposedBy" name="changeProposedBy" placeholder="Name" />

            <label htmlFor="date">Date:</label>
            <DatePicker
              selected={(initialValues.date && new Date(initialValues.date)) || null}
              onChange={date => setFieldValue('date', date)}
            />

            <label htmlFor="departmentName">Department Name:</label>
            <Field id="departmentName" name="departmentName" placeholder="Department" />

            <label htmlFor="documentId">Document ID #:</label>
            <Field id="documentId" name="documentId" placeholder="ID #" />

            <label htmlFor="issueNumber">Issue #:</label>
            <Field id="issueNumber" name="issueNumber" placeholder="Issue Number" />

            <label htmlFor="itemClause">Item / Clause:</label>
            <Field id="itemClause" name="itemClause" placeholder="Item or Clause" />

            <label htmlFor="description">Description:</label>
            <Field as="textarea" id="description" name="description" />

            <label htmlFor="remarks">Remarks:</label>
            <Field as="textarea" id="remarks" name="remarks" />

            <label htmlFor="approved">Approved:</label>
            <Field type="checkbox" id="approved" name="approved" />

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DocumentChangePage;
