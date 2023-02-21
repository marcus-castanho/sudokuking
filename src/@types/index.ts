import { GameHook } from '../components/Game/hooks';

export type NumericRange<
    START extends number,
    END extends number,
    ARR extends unknown[] = [],
    ACC extends number = never,
> = ARR['length'] extends END
    ? ACC | START | END
    : NumericRange<
          START,
          END,
          [...ARR, 1],
          ARR[START] extends undefined ? ACC : ACC | ARR['length']
      >;

export type GameInputValue =
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '8'
    | '9'
    | ' ';

export type SelectedCell = Omit<
    Parameters<ReturnType<GameHook>['changeCell']>[number],
    'value'
>;
