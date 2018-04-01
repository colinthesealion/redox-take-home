import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import * as Table from 'reactabular-table';

import { COMMUNICATION_METHODS } from '../../constants';

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
    property: 'location',
    header: {
      label: 'Location',
    },
    cell: {
      formatters: [
        (value, { rowData }) => {
          switch (rowData.communicationMethod) {
            case COMMUNICATION_METHODS.HTTPS: {
              return `${rowData.requestMethod} to ${rowData.URL}`;
            }
            case COMMUNICATION_METHODS.TCP: {
              return `${rowData.ip}:${rowData.port}`;
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
    return (
      <Table.Provider columns={columns}>
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
};
