import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { url } from "../../utils/api";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import UpdateStudent from "./components/UpdateStudent";
import { useNavigate } from "react-router-dom";

const columns = [
  { field: "id", headerName: "Student Id", width: 220 },
  { field: "name", headerName: "Student Name", width: 260 },
  { field: "email", headerName: "Email Address", width: 290 },
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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function AllRecords() {
  let token = sessionStorage.getItem("token");
  const [rows, setRows] = React.useState([]);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] =
    React.useState(false);
  const [deleteStudentId, setDeleteStudentId] = React.useState(null);

  React.useEffect(() => {
    axios
      .get(url + "getStudents", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setRows(response.data);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  }, []);

  const handleDeleteConfirmationOpen = (id) => {
    setDeleteStudentId(id);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmationClose = () => {
    setDeleteStudentId(null);
    setDeleteConfirmationOpen(false);
  };

  const handleDelete = () => {
    if (deleteStudentId) {
      axios
        .put(`${url}student/delete/${deleteStudentId}`, null, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          setRows((prevRows) =>
            prevRows.filter((row) => row.id !== deleteStudentId)
          );
          handleDeleteConfirmationClose();
        })
        .catch((error) => {
          console.error("Error deleting student:", error);
        });
    }
  };

  function Delete({ id, handleDelete }) {
    const handleClick = () => {
      handleDeleteConfirmationOpen(id);
    };

    return (
      <DeleteIcon
        onClick={handleClick}
        style={{ cursor: "pointer" }}
      ></DeleteIcon>
    );
  }
  const history = useNavigate();
  function Update({ id, name, email, number }) {
    const handleClick = () => {

      <UpdateStudent id={id} name={name} email={email} number={number}/>
      history(`/updateStudent/${id}`)
    };

    return (
      <ModeEditIcon
        onClick={handleClick}
        style={{ cursor: "pointer" }}
      ></ModeEditIcon>
    );
  }
  return (
    <div
      style={{
        height: 650,
        width: "80%",
        marginLeft: "10%",
        marginTop: "0.5%",
      }}
    >
      <DataGrid
        rows={rows}
        columns={[
          ...columns,
          {
            field: "delete",
            headerName: "Delete",
            width: 120,
            renderCell: (params) => (
              <Delete id={params.row.id} handleDelete={handleDelete} />
            ),
          },
          {
            field: "update",
            headerName: "Update",
            width: 120,
            renderCell: (params) => (
              <Update id={params.row.id} name={params.row.name} email={params.row.email} number={params.row.number}/>
            ),
          },
        ]}
        initialState={{
          pagination: { paginationModel: { page: 0, pageSize: 10 } },
        }}
        pageSizeOptions={[5, 10]}
        style={{ fontSize: "20px" }}
      />

      <Dialog
        open={deleteConfirmationOpen}
        onClose={handleDeleteConfirmationClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Student?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this student?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirmationClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
