import { ReactNode, useMemo } from 'react';

import Separator from '@app/components/Separator';
import Table from '@app/components/Table';
import { useGetCommandersQuery } from '@app/store/api/commanders';

import styles from './List.module.scss';
import ManaContainer from './ManaContainer';
import Row from './Row';

const columns: {
  name: string;
  width: number | 'fill';
  sort: 'asc' | 'desc' | 'none' | null;
}[] = [
  { name: '#', width: 40, sort: null },
  { name: 'Commander', width: 'fill', sort: null },
  { name: 'Colors', width: 124, sort: null },
  { name: 'Winrate', width: 68, sort: 'desc' },
  { name: 'Decks', width: 52, sort: 'none' },
  { name: 'Autoincludes', width: 84, sort: 'none' },
  { name: 'Unique', width: 60, sort: 'none' },
  { name: 'Price', width: 108, sort: 'none' },
];

const AVG_WINRATE = 0.25;

const List = () => {
  const { data } = useGetCommandersQuery({});

  const rows = useMemo(
    () =>
      data?.map((commander, index) => (
        <Row columns={columns} key={index}>
          <span key={`${columns[0].name}_${index}`}>{index + 1}</span>
          <WithTableDivider>
            <div
              className={styles['name-column']}
              key={`${columns[1].name}_${index}`}
            >
              {commander.name}
            </div>
          </WithTableDivider>
          <WithTableDivider>
            <ManaContainer key={`${columns[2].name}_${index}`}>
              {commander.identity}
            </ManaContainer>
          </WithTableDivider>
          <WithTableDivider>
            <div
              className={styles['winrate-column']}
              key={`${columns[3].name}_${index}`}
              data-positive={commander.winrate > AVG_WINRATE}
            >
              {Math.round(commander.winrate * 100)}%
            </div>
          </WithTableDivider>
          <WithTableDivider>
            <span key={`${columns[4].name}_${index}`}>{commander.decks}</span>
          </WithTableDivider>
          <WithTableDivider>
            <span key={`${columns[5].name}_${index}`}>
              {commander.autoincludes}
            </span>
          </WithTableDivider>
          <WithTableDivider>
            <span key={`${columns[6].name}_${index}`}>{commander.unique}</span>
          </WithTableDivider>
          <WithTableDivider>
            <span key={`${columns[7].name}_${index}`}>
              ${commander.avgPrice.toFixed(2)}
            </span>
          </WithTableDivider>
        </Row>
      )),
    [data],
  );

  if (!rows) return null;

  return (
    <Table className={styles.table} columns={columns}>
      {rows}
    </Table>
  );
};

const WithTableDivider = ({ children }: { children: ReactNode }) => (
  <div className={styles['separator-wrapper']}>
    <Separator />
    {children}
  </div>
);

export default List;
