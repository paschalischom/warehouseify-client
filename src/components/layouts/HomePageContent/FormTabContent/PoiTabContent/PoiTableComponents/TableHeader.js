import React from 'react';
import {TableHead, TableRow, TableCell, Checkbox, TableSortLabel} from "@material-ui/core";
import styled from "styled-components";

const StyledTableHead = styled(TableHead)`
    & .MuiTableCell-head {
        background-color: #202020;
        color: #ffffffd4;
        border: none;
        font-weight: bold;
    }
`

const StyledTableSortLabel = styled(TableSortLabel)`
    &.MuiTableSortLabel-root:hover {
        color: #fff;
        opacity: 0.5;
    }

    &.MuiTableSortLabel-root.MuiTableSortLabel-active {
        color: #dc6d43;
    }
    
    &.MuiTableSortLabel-root.MuiTableSortLabel-active.MuiTableSortLabel-root.MuiTableSortLabel-active .MuiTableSortLabel-icon {
        color: #dc6d43;
    }
`

const StyledCheckbox = styled(Checkbox)`
    &.MuiCheckbox-root {
        color: #fff;
    }
`

export default function TableHeader(props) {
    const { selectedRowsNum, totalRows, columns, order, orderBy, ...callbackProps } = props;
    const { onMasterCheckboxClick, onSortRequest } = callbackProps;

    const onSortLabelClick = (attribute) => (event) => {
        onSortRequest(event, attribute);
    };

    return (
        <StyledTableHead>
            <TableRow>
                <TableCell padding={'checkbox'}>
                    <StyledCheckbox
                        indeterminate={selectedRowsNum > 0 && selectedRowsNum < totalRows}
                        checked={totalRows > 0 && selectedRowsNum === totalRows}
                        onChange={onMasterCheckboxClick}
                        color={"secondary"}
                    />
                </TableCell>
                {columns.map((column) => (
                    <TableCell
                        key={column.id}
                        align={column.align}
                        // TODO: Check padding
                    >
                        <StyledTableSortLabel
                            active={orderBy === column.id}
                            direction={orderBy === column.id ? order : 'asc'}
                            onClick={onSortLabelClick(column.id)}
                        >
                            {column.label}
                        </StyledTableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </StyledTableHead>
    );
}
