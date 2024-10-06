/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed (knex) {
  // Deletes ALL existing entries
  await knex('quotes').del()
  await knex('quotes').insert([
    { id: 1, quote: 'Self-care is not a luxury. It is a necessity.', author: 'Audre Lorde' },
    { id: 2, quote: 'Discipline is the bridge between goals and accomplishment.', author: 'Jim Rohn' },
    { id: 3, quote: 'Believe you can and you’re halfway there.', author: 'Theodore Roosevelt' },
    { id: 4, quote: 'You are braver than you believe, stronger than you seem, and smarter than you think.', author: 'A.A. Milne' },
    { id: 5, quote: 'What lies behind us and what lies before us are tiny matters compared to what lies within us.', author: 'Ralph Waldo Emerson' },
    { id: 6, quote: 'Positivity always wins…Always.', author: 'Gary Vaynerchuk' },
    { id: 7, quote: 'The only limit to our realization of tomorrow will be our doubts of today.', author: 'Franklin D. Roosevelt' },
    { id: 8, quote: 'Start where you are. Use what you have. Do what you can.', author: 'Arthur Ashe' },
    { id: 9, quote: 'Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.', author: 'Albert Schweitzer' },
    { id: 10, quote: 'You don’t have to be great to start, but you have to start to be great.', author: 'Zig Ziglar' },
    { id: 11, quote: 'In the middle of every difficulty lies opportunity.', author: 'Albert Einstein' },
    { id: 12, quote: 'The way to get started is to quit talking and begin doing.', author: 'Walt Disney' },
    { id: 13, quote: 'Your present circumstances don’t determine where you can go; they merely determine where you start.', author: 'Nido Qubein' },
    { id: 14, quote: 'Every day may not be good, but there’s something good in every day.', author: 'Alice Morse Earle' },
    { id: 15, quote: 'Do what you can, with what you have, where you are.', author: 'Theodore Roosevelt' }
  ]);
}
