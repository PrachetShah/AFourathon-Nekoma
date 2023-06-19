import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Paper from "@mui/material/Paper";
import Update from "./components/Update";
import CreateStudent from "./CreateStudent";
import axios from "axios";
import {url} from "../../utils/api";
import DeleteIcon from '@mui/icons-material/Delete';

const columns = [
  { field: "id", headerName: "Student Id", width: 220 },
  { field: "name", headerName: "Student Name", width: 260 },
  { field: "email", headerName: "Email Address", width: 350 },
  {
    field: "number",
    headerName: "Phone Number",
    width: 210,
  },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function AllRecords() {
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(url+"getStudents")
      .then((response) => {
        setRows(response.data);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .post(`${url}student/delete/${id}`)
      .then(() => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting student:', error);
      });
  };

  function Delete({ id, handleDelete }) {
    const handleClick = () => {
      handleDelete(id);
    };
  
    return (
      <DeleteIcon onClick={handleClick} style={{cursor:"pointer"}}></DeleteIcon>
    );
  }

  return (
    <div
      style={{ height: 650, width: "80%", marginLeft: "10%", marginTop: "0.5%" }}
    >
      <DataGrid
        rows={rows}
        columns={[
          ...columns,
          {
            field: 'delete',
            headerName: 'Delete',
            width: 120,
            renderCell: (params) => (
              <Delete id={params.row.id} handleDelete={handleDelete} />
            ),
          },
        ]}
        initialState={{
          pagination: { paginationModel: { page: 0, pageSize: 10 } },
        }}
        pageSizeOptions={[5, 10]}
        // checkboxSelection
        style={{ fontSize: "20px" }}
      />
    </div>
  );
}
