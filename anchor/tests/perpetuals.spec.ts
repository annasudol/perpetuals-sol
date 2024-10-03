import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { Keypair } from '@solana/web3.js';
import { Perpetuals } from '../target/types/perpetuals';

describe('perpetuals', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);
  const payer = provider.wallet as anchor.Wallet;

  const program = anchor.workspace.Perpetuals as Program<Perpetuals>;

  const perpetualsKeypair = Keypair.generate();

  it('Initialize Perpetuals', async () => {
    await program.methods
      .initialize()
      .accounts({
        perpetuals: perpetualsKeypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([perpetualsKeypair])
      .rpc();

    const currentCount = await program.account.perpetuals.fetch(
      perpetualsKeypair.publicKey
    );

    expect(currentCount.count).toEqual(0);
  });

  it('Increment Perpetuals', async () => {
    await program.methods
      .increment()
      .accounts({ perpetuals: perpetualsKeypair.publicKey })
      .rpc();

    const currentCount = await program.account.perpetuals.fetch(
      perpetualsKeypair.publicKey
    );

    expect(currentCount.count).toEqual(1);
  });

  it('Increment Perpetuals Again', async () => {
    await program.methods
      .increment()
      .accounts({ perpetuals: perpetualsKeypair.publicKey })
      .rpc();

    const currentCount = await program.account.perpetuals.fetch(
      perpetualsKeypair.publicKey
    );

    expect(currentCount.count).toEqual(2);
  });

  it('Decrement Perpetuals', async () => {
    await program.methods
      .decrement()
      .accounts({ perpetuals: perpetualsKeypair.publicKey })
      .rpc();

    const currentCount = await program.account.perpetuals.fetch(
      perpetualsKeypair.publicKey
    );

    expect(currentCount.count).toEqual(1);
  });

  it('Set perpetuals value', async () => {
    await program.methods
      .set(42)
      .accounts({ perpetuals: perpetualsKeypair.publicKey })
      .rpc();

    const currentCount = await program.account.perpetuals.fetch(
      perpetualsKeypair.publicKey
    );

    expect(currentCount.count).toEqual(42);
  });

  it('Set close the perpetuals account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        perpetuals: perpetualsKeypair.publicKey,
      })
      .rpc();

    // The account should no longer exist, returning null.
    const userAccount = await program.account.perpetuals.fetchNullable(
      perpetualsKeypair.publicKey
    );
    expect(userAccount).toBeNull();
  });
});
