#!/usr/bin/env node

/**
 * Basic functionality test script
 * Tests core functionality without requiring a full test framework
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testDatabaseConnection() {
  console.log('🔍 Testing database connection...');
  try {
    const { data, error } = await supabase.from('categories').select('count').limit(1);
    if (error) throw error;
    console.log('✅ Database connection successful');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
}

async function testStorageBuckets() {
  console.log('🔍 Testing storage buckets...');
  try {
    const { data, error } = await supabase.storage.listBuckets();
    if (error) throw error;
    
    const expectedBuckets = ['products', 'vendors', 'categories', 'avatars'];
    const existingBuckets = data.map(bucket => bucket.name);
    
    const missingBuckets = expectedBuckets.filter(bucket => !existingBuckets.includes(bucket));
    
    if (missingBuckets.length > 0) {
      console.error('❌ Missing storage buckets:', missingBuckets);
      return false;
    }
    
    console.log('✅ All storage buckets exist');
    return true;
  } catch (error) {
    console.error('❌ Storage bucket test failed:', error.message);
    return false;
  }
}

async function testBasicQueries() {
  console.log('🔍 Testing basic database queries...');
  try {
    // Test categories
    const { data: categories, error: catError } = await supabase
      .from('categories')
      .select('id, name')
      .limit(5);
    
    if (catError) throw catError;
    console.log(`✅ Categories query successful (${categories.length} categories)`);
    
    // Test products
    const { data: products, error: prodError } = await supabase
      .from('products')
      .select('id, name, status')
      .limit(5);
    
    if (prodError) throw prodError;
    console.log(`✅ Products query successful (${products.length} products)`);
    
    // Test vendors
    const { data: vendors, error: vendError } = await supabase
      .from('vendors')
      .select('id, store_name')
      .limit(5);
    
    if (vendError) throw vendError;
    console.log(`✅ Vendors query successful (${vendors.length} vendors)`);
    
    return true;
  } catch (error) {
    console.error('❌ Basic queries test failed:', error.message);
    return false;
  }
}

async function testSearchFunctionality() {
  console.log('🔍 Testing search functionality...');
  try {
    // Test product search
    const { data: searchResults, error } = await supabase
      .from('products')
      .select(`
        *,
        vendor:vendors!inner(store_name, is_verified),
        category:categories!inner(name, slug)
      `)
      .eq('status', 'active')
      .limit(3);
    
    if (error) throw error;
    console.log(`✅ Search functionality working (${searchResults.length} results)`);
    return true;
  } catch (error) {
    console.error('❌ Search functionality test failed:', error.message);
    return false;
  }
}

async function testRLSPolicies() {
  console.log('🔍 Testing Row Level Security policies...');
  try {
    // Test public access to products
    const { data, error } = await supabase
      .from('products')
      .select('id, name')
      .eq('status', 'active')
      .limit(1);
    
    if (error) throw error;
    console.log('✅ RLS policies allow public product access');
    return true;
  } catch (error) {
    console.error('❌ RLS policies test failed:', error.message);
    return false;
  }
}

async function runAllTests() {
  console.log('🚀 Starting ShopThings Basic Functionality Tests\n');
  
  const tests = [
    { name: 'Database Connection', fn: testDatabaseConnection },
    { name: 'Storage Buckets', fn: testStorageBuckets },
    { name: 'Basic Queries', fn: testBasicQueries },
    { name: 'Search Functionality', fn: testSearchFunctionality },
    { name: 'RLS Policies', fn: testRLSPolicies },
  ];
  
  let passed = 0;
  let failed = 0;
  
  for (const test of tests) {
    console.log(`\n--- ${test.name} ---`);
    const result = await test.fn();
    if (result) {
      passed++;
    } else {
      failed++;
    }
  }
  
  console.log('\n' + '='.repeat(50));
  console.log('📊 TEST RESULTS');
  console.log('='.repeat(50));
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📈 Success Rate: ${Math.round((passed / (passed + failed)) * 100)}%`);
  
  if (failed === 0) {
    console.log('\n🎉 All tests passed! Your ShopThings setup is working correctly.');
  } else {
    console.log('\n⚠️  Some tests failed. Please check the errors above.');
    process.exit(1);
  }
}

// Run tests if this script is executed directly
if (require.main === module) {
  runAllTests().catch(error => {
    console.error('💥 Test runner failed:', error);
    process.exit(1);
  });
}

module.exports = {
  testDatabaseConnection,
  testStorageBuckets,
  testBasicQueries,
  testSearchFunctionality,
  testRLSPolicies,
  runAllTests,
};