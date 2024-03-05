'use client'
import React from 'react';
import './style.css';
import Link from "next/link";

interface SelectedAction {
  rowId: string;
  action: string;
}

interface Props {}

interface State {
  selectedActions: SelectedAction[];
}

class YourComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedActions: [],
    };
  }

  handleRadioClick = (rowId: string, radioName: string) => {
    const radios = document.getElementsByName(radioName) as NodeListOf<HTMLInputElement>;

    radios.forEach((radio) => {
      if (radio.closest('tr')?.id !== rowId) {
        radio.checked = false;
      }
    });
  };

  proceed = () => {
    const selectedActions: SelectedAction[] = [];
    const rowsToRemove: HTMLTableRowElement[] = [];
    const rows = document.querySelectorAll('tbody tr') as NodeListOf<HTMLTableRowElement>;

    rows.forEach((row) => {
      const radio = row.querySelector('input[type="radio"]:checked') as HTMLInputElement;
      if (radio) {
        const action = radio.value;
        selectedActions.push({ rowId: row.id, action });
        rowsToRemove.push(row);
      }
    });

    // Remove rows from the table
    rowsToRemove.forEach((row) => {
      row.remove();
    });

    // Here you can use the selectedActions array to perform further actions or validation
    console.log(selectedActions);

    // Update state if needed
    this.setState({
      selectedActions,
    });
  };

  render() {
    return (
      <div>
        <main className="main">
          <div className='toph'>
            CPA Forms & Log</div>

          <table>
          <thead>
            <tr>
              <th>CPA Against</th>
              <th>Action</th>
              <th>Reason</th>
              <th>Proof</th>
            </tr>
          </thead>
          <tbody>
            <tr id="row1">
              <td>Production Department</td>
              <td>
                <label>
                <input
  type="radio"
  name="action1"
  value="approve"
  onClick={() => this.handleRadioClick('row1', 'action1')}
/>

                  Approve
                </label>
                <label>
                <input
  type="radio"
  name="action1"
  value="approve"
  onClick={() => this.handleRadioClick('row1', 'action1')}
/>

                  Reject
                </label>
              </td>
              <td>Reason will be requested while using the final DMS portal</td>
              <td>
                <button onClick={() => alert('This is the proof against the CPA')}>View</button>
              </td>
            </tr>
            <tr id="row2">
              <td>Quality Control Department</td>
              <td>
                <label>
                <input
  type="radio"
  name="action1"
  value="approve"
  onClick={() => this.handleRadioClick('row1', 'action1')}
/>

                  Approve
                </label>
                <label>
                <input
  type="radio"
  name="action1"
  value="approve"
  onClick={() => this.handleRadioClick('row1', 'action1')}
/>

                  Reject
                </label>
              </td>
              <td>Reason will be requested while using the final DMS portal</td>
              <td>
                <button onClick={() => alert('This is the proof against the CPA')}>View</button>
              </td>
            </tr>
          </tbody>
        </table>

          <button id="proceedButton" onClick={this.proceed}>
            Proceed
          </button>
          <ul>
            <Link href="/home/cpa/customer">
            <li>
              Customer support
            </li>
            </Link>
          </ul>

          <div className="container">
            <form action="submit_form" method="post">
              <label htmlFor="message">What (Problem Description):</label>
              <textarea id="message" name="message" rows={4} required></textarea>

              <label htmlFor="why">Why:</label>
              <input type="text" id="why" name="why" required />
              <label htmlFor="department">Department:</label>
              <input type="text" id="department" name="department" required />

              <label htmlFor="where">Where:</label>
              <input type="text" id="where" name="where" />

              <label htmlFor="when">When:</label>
              <input type="text" id="when" name="when" />

              <div className="uploading">
                <form action="upload.php" method="post" encType="multipart/form-data">
                  <label htmlFor="image">Select Image:</label>
                  <input type="file" name="image" id="image" accept=".jpg, .jpeg, .png" required />
                  <br />
                </form>

                <input type="submit" value="Submit" />
              </div>
            </form>
          </div>
          
        </main>
      </div>
    );
  }
}

export default YourComponent;
