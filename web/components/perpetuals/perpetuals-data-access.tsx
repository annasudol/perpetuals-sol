'use client';

import {
  getPerpetualsProgram,
  getPerpetualsProgramId,
} from '@perpetuals/anchor';
import { Program } from '@coral-xyz/anchor';
import { useConnection } from '@solana/wallet-adapter-react';
import { Cluster, Keypair, PublicKey } from '@solana/web3.js';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import toast from 'react-hot-toast';
import { useCluster } from '../cluster/cluster-data-access';
import { useAnchorProvider } from '../solana/solana-provider';
import { useTransactionToast } from '../ui/ui-layout';

export function usePerpetualsProgram() {
  const { connection } = useConnection();
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const provider = useAnchorProvider();
  const programId = useMemo(
    () => getPerpetualsProgramId(cluster.network as Cluster),
    [cluster]
  );
  const program = getPerpetualsProgram(provider);

  const accounts = useQuery({
    queryKey: ['perpetuals', 'all', { cluster }],
    queryFn: () => program.account.perpetuals.all(),
  });

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  });

  const initialize = useMutation({
    mutationKey: ['perpetuals', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods
        .initialize()
        .accounts({ perpetuals: keypair.publicKey })
        .signers([keypair])
        .rpc(),
    onSuccess: (signature) => {
      transactionToast(signature);
      return accounts.refetch();
    },
    onError: () => toast.error('Failed to initialize account'),
  });

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  };
}

export function usePerpetualsProgramAccount({
  account,
}: {
  account: PublicKey;
}) {
  const { cluster } = useCluster();
  const transactionToast = useTransactionToast();
  const { program, accounts } = usePerpetualsProgram();

  const accountQuery = useQuery({
    queryKey: ['perpetuals', 'fetch', { cluster, account }],
    queryFn: () => program.account.perpetuals.fetch(account),
  });

  const closeMutation = useMutation({
    mutationKey: ['perpetuals', 'close', { cluster, account }],
    mutationFn: () =>
      program.methods.close().accounts({ perpetuals: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return accounts.refetch();
    },
  });

  const decrementMutation = useMutation({
    mutationKey: ['perpetuals', 'decrement', { cluster, account }],
    mutationFn: () =>
      program.methods.decrement().accounts({ perpetuals: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return accountQuery.refetch();
    },
  });

  const incrementMutation = useMutation({
    mutationKey: ['perpetuals', 'increment', { cluster, account }],
    mutationFn: () =>
      program.methods.increment().accounts({ perpetuals: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return accountQuery.refetch();
    },
  });

  const setMutation = useMutation({
    mutationKey: ['perpetuals', 'set', { cluster, account }],
    mutationFn: (value: number) =>
      program.methods.set(value).accounts({ perpetuals: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx);
      return accountQuery.refetch();
    },
  });

  return {
    accountQuery,
    closeMutation,
    decrementMutation,
    incrementMutation,
    setMutation,
  };
}
