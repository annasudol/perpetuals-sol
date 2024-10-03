#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("7UqBfbcN4jjMtwFLZWBk5mRZgeaWs1aF2NSjdPYwkvzR");

#[program]
pub mod perpetuals {
    use super::*;

  pub fn close(_ctx: Context<ClosePerpetuals>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.perpetuals.count = ctx.accounts.perpetuals.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.perpetuals.count = ctx.accounts.perpetuals.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializePerpetuals>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.perpetuals.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializePerpetuals<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + Perpetuals::INIT_SPACE,
  payer = payer
  )]
  pub perpetuals: Account<'info, Perpetuals>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct ClosePerpetuals<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub perpetuals: Account<'info, Perpetuals>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub perpetuals: Account<'info, Perpetuals>,
}

#[account]
#[derive(InitSpace)]
pub struct Perpetuals {
  count: u8,
}
