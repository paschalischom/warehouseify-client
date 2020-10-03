import React, {useEffect} from 'react';
import styled from "styled-components";
import { makeStyles } from '@material-ui/core/styles';
import {
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableRow,
    TableCell,
    Checkbox,
    TablePagination,
    IconButton
} from "@material-ui/core";
import {TableHeader, TableToolbar} from "./PoiTableComponents";
import { connect } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import EditDialog from "../../../../reusable/EditDialog";
import {deletePoiBatch} from "../../../../../store/actions/userDataActions";

const StyledTable = styled(Table)`
    minWidth: 750px;
`

const StyledTableRow = styled(TableRow)`
    &.MuiTableRow-root:hover {
        cursor: pointer;
    }
`

const StyledTableCell = styled(({isSorted, ...props}) => <TableCell {...props} />)`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 0;

    ${props => props.isSorted 
    ? `
        &.MuiTableCell-body {
            color: #dc6d43;
        }
    `
    : `
        &.MuiTableCell-body {
            color: #b7b7b7;
        }
    `
    }
    
    &.MuiTableCell-root {
        border-bottom: 1px solid rgb(224 224 224 / 25%);
    }
`;

const StyledCheckbox = styled(Checkbox)`
    &.MuiCheckbox-root {
        color: #fff;
    }
`

const StyledTablePagination = styled(TablePagination)`
    &.MuiTablePagination-root {
        color: #fff;
    }
`

const useStyles = makeStyles(() => ({
    paperRoot: {
        backgroundColor: '#2e2e31',
        margin: '10px',
    },
}));

const columns = [
    { id: 'address', align: 'left', label: 'Address', color: '#dc6d43' },
    { id: 'state', align: 'left', label: 'State', color: '#b7b7b7' },
    { id: 'radius', align: 'right', label: 'Radius (m)', color: '#dc6d43' },
    { id: 'lat', align: 'right', label: 'Lat', color: '#b7b7b7' },
    { id: 'lng', align: 'right', label: 'Lng', color: '#b7b7b7' },
    { id: 'author', align: 'left', label: 'Author', color: '#dc6d43' },
    { id: 'updated', align: 'left', label: 'Updated', color: '#b7b7b7' },
    { id: 'status', align: 'left', label: 'Status', color: '#dc6d43' },
    { id: 'operations', align: 'center', label: 'Operations', color: '#b7b7b7' },
]

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);

}

function stableSort(itemsObject, comparator) {
    const itemIdsArray = Object.keys(itemsObject).map((id, index) => [id, index]);
    itemIdsArray.sort((a, b) => {
        const order = comparator(itemsObject[a[0]], itemsObject[b[0]]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return itemIdsArray.map((itemId) => itemId[0]);
}

function PoiTable(props) {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('state');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(7);
    const [selectedRows, setSelectedRows] = React.useState([]);
    const [editDialogOpen, setEditDialogOpen] = React.useState(false);
    const [editPoiUID, setEditPoiUID] = React.useState(null);

    const { poiList, profile, deletePoiBatch } = props;
    const totalRows = Object.keys(poiList).length;

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelectedRows = Object.keys(poiList);
            setSelectedRows(newSelectedRows);
            return;
        }
        setSelectedRows([]);
    };

    const onSortRequest = (event, attribute) => {
        const isAsc = orderBy === attribute && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(attribute);
    };

    const onDeleteRequest = () => {
        deletePoiBatch(selectedRows);
        setSelectedRows([]);
        setPage(0);
    }

    const handleRowClick = (event, id) => {
        const selectedIndex = selectedRows.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selectedRows, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selectedRows.slice(1));
        } else if (selectedIndex === selectedRows.length - 1) {
            newSelected = newSelected.concat(selectedRows.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selectedRows.slice(0, selectedIndex),
                selectedRows.slice(selectedIndex + 1),
            );
        }

        setSelectedRows(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const onEditOpen = (event, poiUID) => {
        event.preventDefault();
        event.stopPropagation();
        setEditPoiUID(poiUID);
        setEditDialogOpen(true);
    }

    const onEditClose = () => {
        setEditDialogOpen(false);
        setEditPoiUID(null);
    }

    const isSelected = (id) => selectedRows.indexOf(id) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, totalRows - page * rowsPerPage);

    return (
        <React.Fragment>
            <Paper classes={{
                root: classes.paperRoot
            }}>
                <TableToolbar selectedRowsNum={selectedRows.length} onDeleteRequest={onDeleteRequest} />
                <TableContainer>
                    <StyledTable>
                        <TableHeader
                            selectedRowsNum={selectedRows.length}
                            totalRows={totalRows}
                            columns={columns}
                            order={order}
                            orderBy={orderBy}
                            onSortRequest={onSortRequest}
                            onMasterCheckboxClick={handleSelectAllClick}
                        />
                        <TableBody>
                            {stableSort(poiList, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((poiUID) => {
                                    const isRowSelected = isSelected(poiUID);
                                    const row = poiList[poiUID];

                                    return (
                                        <StyledTableRow
                                            key={poiUID}
                                            hover
                                            tabIndex={-1}
                                            selected={isRowSelected}
                                            onClick={(event) => handleRowClick(event, poiUID)}
                                        >
                                            <StyledTableCell padding={'checkbox'}>
                                                <StyledCheckbox checked={isRowSelected} color={"secondary"} />
                                            </StyledTableCell>
                                            {columns.map((column) => {
                                                return (
                                                    <StyledTableCell
                                                        key={column.id}
                                                        align={column.align}
                                                        isSorted={orderBy === column.id}
                                                    >
                                                        {column.id === 'author'
                                                            ? profile.fullName
                                                            : column.id === 'operations'
                                                            ? <IconButton
                                                                    aria-label={'edit'}
                                                                    color={"inherit"}
                                                                    size={"small"}
                                                                    onClick={(event) => onEditOpen(event, poiUID)}
                                                                >
                                                                    <EditIcon fontSize={"small"}/>
                                                                </IconButton>
                                                            : row[column.id]
                                                        }
                                                    </StyledTableCell>
                                                )
                                            })}
                                        </StyledTableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 58.18 * emptyRows }}>
                                    <TableCell colSpan={columns.length + 1} />
                                </TableRow>
                            )}
                        </TableBody>
                    </StyledTable>
                </TableContainer>
                <StyledTablePagination
                    rowsPerPageOptions={[7]}
                    component="div"
                    count={totalRows}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                />
                {editDialogOpen &&
                    <EditDialog
                        editDialogOpen={editDialogOpen}
                        handleEditDialogClose={onEditClose}
                        poiUID={editPoiUID}
                    />
                }
            </Paper>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        poiList: state.user.poiList,
        profile: state.user.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deletePoiBatch: (selectedRows) => dispatch(deletePoiBatch(selectedRows))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PoiTable);
