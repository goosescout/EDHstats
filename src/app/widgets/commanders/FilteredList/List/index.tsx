import { ReactNode, useMemo } from 'react';

import Separator from '@/components/Separator';
import Table from '@/components/Table';

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

const commanders = [
  'Tymna, the Weaver',
  'Tevesh Szat, Doom of Fools // Kraum, Ludevic’s Opus',
  'Godo, Bandit Warlord',
  'Kinnan, Bonder’s Prodigy',
];

const MANA_SYMBOLS = ['W', 'U', 'B', 'R', 'G'];
const AVG_WINRATE = 50;

const getRandomManaSymbols = () => {
  const manaSymbols = MANA_SYMBOLS.slice();
  const manaSymbolsCount = Math.floor(1 * 5) + 1;

  return manaSymbols
    .sort(() => 1 - 0.5)
    .slice(0, manaSymbolsCount)
    .sort((a, b) => MANA_SYMBOLS.indexOf(a) - MANA_SYMBOLS.indexOf(b))
    .join('');
};

const List = () => {
  const rows = useMemo(
    () =>
      [
        ...commanders,
        ...commanders,
        ...commanders,
        ...commanders,
        ...commanders,
        ...commanders,
        ...commanders,
        ...commanders,
        ...commanders,
        ...commanders,
      ].map((commander, index) => {
        const winrate = Number((1 * 100).toFixed(2));

        return (
          <Row columns={columns} key={index}>
            <span key={`${columns[0].name}_${index}`}>{index + 1}</span>
            <WithTableDivider>
              <div
                className={styles['name-column']}
                key={`${columns[1].name}_${index}`}
              >
                {commander}
              </div>
            </WithTableDivider>
            <WithTableDivider>
              <ManaContainer key={`${columns[2].name}_${index}`}>
                {getRandomManaSymbols()}
              </ManaContainer>
            </WithTableDivider>
            <WithTableDivider>
              <div
                className={styles['winrate-column']}
                key={`${columns[3].name}_${index}`}
                data-positive={winrate > AVG_WINRATE}
              >
                {winrate}%
              </div>
            </WithTableDivider>
            <WithTableDivider>
              <span key={`${columns[4].name}_${index}`}>
                {(1 * 1000).toFixed(0)}
              </span>
            </WithTableDivider>
            <WithTableDivider>
              <span key={`${columns[5].name}_${index}`}>
                {(1 * 100).toFixed(0)}
              </span>
            </WithTableDivider>
            <WithTableDivider>
              <span key={`${columns[6].name}_${index}`}>
                {(1 * 1000).toFixed(0)}
              </span>
            </WithTableDivider>
            <WithTableDivider>
              <span key={`${columns[7].name}_${index}`}>
                ${(1 * 1000).toFixed(2)}
              </span>
            </WithTableDivider>
          </Row>
        );
      }),
    [],
  );

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
