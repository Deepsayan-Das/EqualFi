
import {
  WeilWallet,
  Schema,
  Contract,
  ContractFactory,
  parseSchema,
  parseExecutionResult,
  WeilWalletConnection,
  Option,
} from '@weilliptic/weil-sdk';


export const credit_score = ((wallet: WeilWallet | WeilWalletConnection, contractAddress: string) => ({
  get_score: async (account_age_months: number, monthly_income_avg: number, income_frequency: string, monthly_rent: number, monthly_utilities: number, missed_payments_count: number) => {

    const args = parseSchema(
      Schema.args({
        account_age_months: Schema.u32,
        monthly_income_avg: Schema.u64,
        income_frequency: Schema.string,
        monthly_rent: Schema.u64,
        monthly_utilities: Schema.u64,
        missed_payments_count: Schema.u32,
      }),
      { account_age_months, monthly_income_avg, income_frequency, monthly_rent, monthly_utilities, missed_payments_count }
    );

    const result = await wallet.contracts.execute(
      contractAddress,
      "get_score",
      args,
    );

    return parseExecutionResult(result, Schema.u64);
  },

} satisfies Contract)) satisfies ContractFactory;
