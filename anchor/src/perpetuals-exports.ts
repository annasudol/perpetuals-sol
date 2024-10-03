// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor';
import { Cluster, PublicKey } from '@solana/web3.js';
import PerpetualsIDL from '../target/idl/perpetuals.json';
import type { Perpetuals } from '../target/types/perpetuals';

// Re-export the generated IDL and type
export { Perpetuals, PerpetualsIDL };

// The programId is imported from the program IDL.
export const PERPETUALS_PROGRAM_ID = new PublicKey(PerpetualsIDL.address);

// This is a helper function to get the Perpetuals Anchor program.
export function getPerpetualsProgram(provider: AnchorProvider) {
  return new Program(PerpetualsIDL as Perpetuals, provider);
}

// This is a helper function to get the program ID for the Perpetuals program depending on the cluster.
export function getPerpetualsProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
    case 'mainnet-beta':
    default:
      return PERPETUALS_PROGRAM_ID;
  }
}
