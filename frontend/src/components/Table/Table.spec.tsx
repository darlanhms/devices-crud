import { render, screen } from '@testing-library/react';
import Table from './index';

describe('Table', () => {
  it('renders table components', () => {
    render(
      <Table.Container>
        <Table>
          <Table.Head>
            <Table.Row>
              <Table.Th>Table head cell</Table.Th>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            <Table.Row>
              <Table.Td>Table body cell</Table.Td>
            </Table.Row>
          </Table.Body>
        </Table>
      </Table.Container>,
    );

    expect(screen.getByTestId('table-container')).toBeInTheDocument();
    expect(screen.getByTestId('table')).toBeInTheDocument();
    expect(screen.getByTestId('table-head')).toBeInTheDocument();
    expect(screen.getByTestId('table-body')).toBeInTheDocument();
    expect(screen.getAllByTestId('table-row')).toHaveLength(2);
    expect(screen.getByText(/table head cell/i)).toBeInTheDocument();
    expect(screen.getByText(/table body cell/i)).toBeInTheDocument();
  });
});
