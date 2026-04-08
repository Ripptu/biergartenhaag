import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://acigridichustckmnfcv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjaWdyaWRpY2h1c3Rja21uZmN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1OTkzMDUsImV4cCI6MjA5MTE3NTMwNX0.FmweQxzQ_LnZ-9nVNYlx4bxgDZajHGHGzhK3OfX8YGo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);