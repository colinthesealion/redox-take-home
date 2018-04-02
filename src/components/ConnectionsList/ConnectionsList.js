import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import * as Table from 'reactabular-table';
import BEMHelper from 'react-bem-helper';

import { COMMUNICATION_METHODS } from '../../constants';

import './connections-list.scss';

const classes = new BEMHelper({
  name: 'connections-list',
  prefix: 'c-',
});

/* The columns in our connections list */
const columns = [
  {
    property: 'name',
    header: {
      label: 'Name',
    },
  },
  {
    property: 'communicationMethod',
    header: {
      label: 'Communication Method',
    },
  },
  {
    property: 'route',
    header: {
      label: 'Route',
    },
    cell: {
      formatters: [
        (value, { rowData }) => {
          switch (rowData.communicationMethod) {
            case COMMUNICATION_METHODS.HTTPS: {
              return `${rowData.requestMethod} to ${rowData.url}`;
            }
            case COMMUNICATION_METHODS.TCP: {
              return rowData.port
                ? `${rowData.ip}:${rowData.port}`
                : rowData.ip;
            }
            default: {
              return value;
            }
          }
        },
      ],
    },
  },
];

export default class ConnectionsList extends React.PureComponent {
  render() {
    const editColumn = {
      property: 'id',
      cell: {
        formatters: [
          (id) => {
            return (
              <a
                onClick={(event) => {
                  this.props.toggleModal(event, id);
                }}
              >
                edit
              </a>
              );
          }
        ]
      }
    };

    return (
      <Table.Provider
        columns={[ editColumn, ...columns ]}
        {...classes({ element: 'table' })}
      >
        <Table.Header />
        { /* Reactabular is expecting flat javascript objects,
             not an immutable list.
             We keep it immutable in the props though so that shallow
             comparison is sufficient to determine if a re-render
             is necessary.
          */
        }
        <Table.Body rows={this.props.connections.toJS()} rowKey="id" />
      </Table.Provider>
    );
  }
}
ConnectionsList.propTypes = {
  connections: ImmutablePropTypes.listOf(ImmutablePropTypes.map),
  toggleModal: PropTypes.func.isRequired,
};
