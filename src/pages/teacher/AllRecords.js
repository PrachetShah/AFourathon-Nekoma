import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Delete from "./components/Delete";
import Update from "./components/Update";
import CreateStudent from "./CreateStudent";

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

const columns = [
  { field: "id", headerName: "Student Id", width: 220 },
  { field: "studentName", headerName: "Student Name", width: 260 },
  { field: "emailAddress", headerName: "Email Address", width: 350 },
  {
    field: "phone",
    headerName: "Phone Number",
    width: 210,
  },
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  // },
];

const rows = [
  { id: 60004200052, studentName: "Rachana Yeldi", emailAddress: "y.rachana1104@gmail.com", phone: 9969821746 },
  { id: 2, studentName: "Lannister", emailAddress: "Cersei", phone: 42 },
  { id: 3, studentName: "Lannister", emailAddress: "Jaime", phone: 45 },
  { id: 4, studentName: "Stark", emailAddress: "Arya", phone: 16 },
  { id: 5, studentName: "Targaryen", emailAddress: "Daenerys", phone: null },
  { id: 6, studentName: "Melisandre", emailAddress: null, phone: 150 },
  { id: 7, studentName: "Clifford", emailAddress: "Ferrara", phone: 44 },
  { id: 8, studentName: "Frances", emailAddress: "Rossini", phone: 36 },
  { id: 9, studentName: "Roxie", emailAddress: "Harvey", phone: 65 },
];

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export default function AllRecords() {
  return (
    <div
      style={{
        height: 400,
        width: "80%",
        marginLeft: "10%",
        marginTop: "2%",
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        style={{fontSize:"20px"}}
      />
    </div>
    // <TableContainer component={Paper}>
    //   <Table sx={{ minWidth: 700 }} aria-label="customized table">
    //     <TableHead>
    //       <TableRow>
    //         <StyledTableCell>Dessert (100g serving)</StyledTableCell>
    //         <StyledTableCell align="right">Calories</StyledTableCell>
    //         <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
    //         <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
    //         <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {rows.map((row) => (
    //         <StyledTableRow key={row.name}>
    //           <StyledTableCell component="th" scope="row">
    //             {row.name}
    //           </StyledTableCell>
    //           <StyledTableCell align="right">{row.calories}</StyledTableCell>
    //           <StyledTableCell align="right">{row.fat}</StyledTableCell>
    //           <StyledTableCell align="right">{row.carbs}</StyledTableCell>
    //           <StyledTableCell align="right">{row.protein}</StyledTableCell>
    //         </StyledTableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </TableContainer>
  );
}
