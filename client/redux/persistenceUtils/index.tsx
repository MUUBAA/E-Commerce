import { persistReducer } from 'redux-persist';
import type { PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import type { Reducer } from '@reduxjs/toolkit';

type PersistPartial<State> = {
    _persist?: {
        version: number;
        rehydrated: boolean;
    };
} & Partial<State>;

interface PersistSliceOptions<State> {
    sliceKey: string;
    storageKey?: string;
    blacklist?: (keyof State & string)[];
}

export function persistSlice<State>(
  reducer: Reducer<State>,
  options: PersistSliceOptions<State>,
): Reducer<State & PersistPartial<State>> {
  const { sliceKey, storageKey = sliceKey, blacklist = [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] } = options;

  const persistConfig: PersistConfig<State> = {
    key: storageKey,
    storage,
    blacklist: blacklist as string[], // Explicitly cast to string[]
  };

  return persistReducer(persistConfig, reducer) as Reducer<State & PersistPartial<State>>;
}
