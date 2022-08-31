export default (request, context) => {
  const controlBranch = "main";
  const testBranch = "blog-sidebar-left";

  // look for existing "nf_ab" cookie
  const bucketName = "nf_ab";
  const bucket = context.cookies.get(bucketName);

  // return here if we find a cookie
  if (bucket) {
    context.log(`${bucketName} ${bucket} already assigned!`);
  }

  // if no "nf_ab" cookie is found, assign the user to a bucket
  // in this example we're using two buckets (a, b) with an equal weighting of 50/50
  const weighting = 0.5;

  // get a random number between (0-1)
  // this is a basic example and you may want to experiment
  const random = Math.random();
  const newBucketValue = random <= weighting ? controlBranch : testBranch;

  // set the new "nf_ab" cookie
  context.cookies.set({
    name: bucketName,
    value: newBucketValue,
  });

  context.log(`You have been assigned ${bucketName} ${newBucketValue}.`);
};
