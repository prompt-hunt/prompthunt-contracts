import hre, { ethers } from 'hardhat';
import { getDeploymentAddress } from '../.deployment/deploymentManager';
import uploadToIPFS from '../utils/uploadToIpfs';

async function main() {
  const network = hre.network.name;
  console.log('Network:', network);

  const [, alice, bob, carol, dave] = await ethers.getSigners();

  // Get contract
  const promptHunt = await ethers.getContractAt(
    'PromptHunt',
    getDeploymentAddress(network, 'PromptHunt'),
  );

  // Upload to IPFS
  const prompts = [
    {
      signer: alice,
      data: {
        title: 'Lesson Plan Generator',
        model: 'GPT',
        prompt:
          'I want you to develop a lesson plan for learning the subject <subject>. The objective is for the student to master the fundamentals of the subject. Provide a list of lessons and materials for each of them, as well as exercises for the student to practice.',
        image:
          'https://firebasestorage.googleapis.com/v0/b/promptbase.appspot.com/o/DALLE_IMAGES%2FCrpcqah7YdgU133cBw6H%2Fresized%2F1687293200789_800x800.webp?alt=media&token=c5f63804-7181-4039-bf15-1a24bf98afea',
        exampleInput: {
          subject: 'math',
        },
        exampleOutput:
          'Lesson 1 Objective: Understand the Fundamentals of Math. Materials: A textbook on basic math, pencils and paper, calculator. Lesson: Spend time discussing the basics of math such as what it is, why we use it, and what types of things it can be used for. Focus on topics such as numbers, operations (addition, subtraction, multiplication and division), fractions, decimals, square roots and exponents. Exercises: Have students work through some basic addition and multiplication problems on paper. Also have them practice simplifying fractions and solving equations with one or more unknowns. Lesson 2 Objective: Learn about Geometry Basics. Materials: Geometry textbook, ruler, protractor. Lesson: Introduce students to the basics of geometry including shapes, lines and angles. Discuss concepts such as area and perimeter, symmetry and 3D objects. Provide examples of basic geometric figures such as squares, triangles and circles to help illustrate the concepts discussed. Exercises: Have students practice creating various geometric figures using a ruler or a protractor from scratch or by following a set of directions given in the textbook or provided by teacher. Encourage them to experiment with different shapes in order to become comfortable with geometry basics before moving onto more complex topics. Lesson 3 Objective: Understand Basic Concepts of Algebra Materials: Algebra textbook or workbook Lesson: Introduce students to the fundamental concepts of algebra such as variables, equations and functions using age-appropriate language they can understand easily (i.e., don’t use too much jargon). Provide examples that relate algebra to real-world scenarios so that students can understand why they should learn algebra and how they might apply it down the line in their studies (or even in everyday life). Exercises: Use a selection of simple equations for students to solve both on paper as well as using calculators when necessary (where appropriate). As they progress through these exercises have them introduce some basic notation into their solutions so they are getting used to writing out equations properly rather than just plugging numbers into calculators every time. Lesson 4 Objective: Understand Basic Concepts of Statistics Materials: Statistics textbook or workbook Lesson: Start by introducing students to the concept of probability so they understand how often something might occur compared to another event or outcome in terms of likelihood (i.e., something that is likely versus something that is unlikely). Provide examples related to real-life situations such as rolling dice games so that student relate difficult abstract concepts with something more tangible like a game situation where probability applies itself naturally every time you roll dice/spin wheels etc.. Discuss other fundamental concepts related to statistics such as graphing data points (and drawing conclusions from them), analyzing trends from large data sets etc... Exercises: For homework assign problems from the workbook which will give students practice in setting up statistical models based on given data sets/parameters etc.. Allow for questions during class if there is confusion amongst any particular student while working out their homework problems – this will allow teachers opportunity assess each individual student’s level understanding quickly & accurately when faced with difficulty/challenge solving problems experienced during homework sessions...',
        category: 'Productivity',
      },
    },
    {
      signer: bob,
      data: {
        title: 'Business Plan Creator',
        model: 'GPT',
        prompt:
          'Generate a detailed business plan for a startup with the following product: <product>. The business plan should include a description of the product, the target market, the business model, the marketing strategy, the financial projections, and the team.',
        image:
          'https://firebasestorage.googleapis.com/v0/b/promptbase.appspot.com/o/DALLE_IMAGES%2FCrpcqah7YdgU133cBw6H%2Fresized%2F1687293200789_800x800.webp?alt=media&token=c5f63804-7181-4039-bf15-1a24bf98afea',
        exampleInput: {
          product: 'sms marketing platform',
        },
        exampleOutput:
          'Product Description: SMS Marketing Platform is a cloud-based platform designed to help businesses with their text message marketing campaigns. It allows users to create, send and manage campaigns with ease. The platform offers features such as customizable templates, automated delivery, rich analytics, and advanced segmentation. Additionally, the platform integrates with other popular tools such as email marketing software and customer relationship management (CRM) systems. This enables businesses to streamline their marketing efforts and maximize their reach. Target Market Our target market consists of small-to medium-sized businesses in various industries including retail, healthcare, financial services, restaurants & hospitality, real estate and more. These businesses are looking for a cost effective way to reach their customers through text messaging without sacrificing time or quality of service. In addition to small businesses, our target market also includes digital marketers at larger organizations who are looking for a more flexible solution than traditional marketing tools offer. Business Model We will offer two pricing models for our product: a “pay as you go” plan for smaller budgets and an “enterprise” plan for larger organizations which includes additional features like automated delivery and advanced segmentation. Both plans will include 24/7 customer support. We will also offer an affiliate program which will allow users to earn commissions by referring new customers to our platform. Marketing Strategy We will employ both online and offline tactics to market our product. For online tactics we plan on utilizing social media platforms such as Facebook, Twitter and LinkedIn as well as search engine optimization (SEO) techniques to increase visibility of our product amongst potential customers. In addition we also plan on running pay-per click (PPC) campaigns that focus on specific industries or target markets based on customer segmentation data we have collected from analytics software programs such as Google Analytics or Adobe Analytics. For offline tactics we plan on attending industry trade shows and conventions where we can demonstrate our product in person and network with potential customers face-to-face. We also plan on utilizing traditional print advertising in relevant publications like magazines and newspapers targeted towards our target markets in order to generate leads for potential customers who may not be aware of our product yet but would benefit from it significantly if given the opportunity to use it . Financial Projections Based on current industry growth trends we expect our revenue growth rate over the next 3 years to remain consistent at roughly 20%. Over this same period we expect that operational costs associated with running the business such as employee salaries, hosting fees etc., will remain constant at 15%. This means that between years 1 - 3 we should see a net profit margin of roughly 5% which translates into total profits of $39000 within three years based off an initial investment of $20000 dollars in the company start up costs (These figures are estimates only). Team The team behind this startup consists of four members: an experienced software developer who can handle both frontend development tasks such as UI / UX design but also backend development tasks related dynamic content creation etc.; an experienced marketer who can handle both online & offline marketing tasks such as PPC campaigns & trade show attendance; a sales representative capable of managing relationships with current & potential clients; and a project manager responsible for getting things done efficiently & effectively within the team while maintaining good communication between all members involved in the project.',
        category: 'Productivity',
      },
    },
    {
      signer: bob,
      data: {
        title: 'Email Newsletter Generator',
        model: 'GPT',
        prompt: '',
        image:
          'https://firebasestorage.googleapis.com/v0/b/promptbase.appspot.com/o/DALLE_IMAGES%2FCrpcqah7YdgU133cBw6H%2Fresized%2F1687293200789_800x800.webp?alt=media&token=c5f63804-7181-4039-bf15-1a24bf98afea',
        exampleInput: {
          product: 'sms marketing platform',
        },
        exampleOutput:
          'Product Description: SMS Marketing Platform is a cloud-based platform designed to help businesses with their text message marketing campaigns. It allows users to create, send and manage campaigns with ease. The platform offers features such as customizable templates, automated delivery, rich analytics, and advanced segmentation. Additionally, the platform integrates with other popular tools such as email marketing software and customer relationship management (CRM) systems. This enables businesses to streamline their marketing efforts and maximize their reach. Target Market Our target market consists of small-to medium-sized businesses in various industries including retail, healthcare, financial services, restaurants & hospitality, real estate and more. These businesses are looking for a cost effective way to reach their customers through text messaging without sacrificing time or quality of service. In addition to small businesses, our target market also includes digital marketers at larger organizations who are looking for a more flexible solution than traditional marketing tools offer. Business Model We will offer two pricing models for our product: a “pay as you go” plan for smaller budgets and an “enterprise” plan for larger organizations which includes additional features like automated delivery and advanced segmentation. Both plans will include 24/7 customer support. We will also offer an affiliate program which will allow users to earn commissions by referring new customers to our platform. Marketing Strategy We will employ both online and offline tactics to market our product. For online tactics we plan on utilizing social media platforms such as Facebook, Twitter and LinkedIn as well as search engine optimization (SEO) techniques to increase visibility of our product amongst potential customers. In addition we also plan on running pay-per click (PPC) campaigns that focus on specific industries or target markets based on customer segmentation data we have collected from analytics software programs such as Google Analytics or Adobe Analytics. For offline tactics we plan on attending industry trade shows and conventions where we can demonstrate our product in person and network with potential customers face-to-face. We also plan on utilizing traditional print advertising in relevant publications like magazines and newspapers targeted towards our target markets in order to generate leads for potential customers who may not be aware of our product yet but would benefit from it significantly if given the opportunity to use it . Financial Projections Based on current industry growth trends we expect our revenue growth rate over the next 3 years to remain consistent at roughly 20%. Over this same period we expect that operational costs associated with running the business such as employee salaries, hosting fees etc., will remain constant at 15%. This means that between years 1 - 3 we should see a net profit margin of roughly 5% which translates into total profits of $39000 within three years based off an initial investment of $20000 dollars in the company start up costs (These figures are estimates only). Team The team behind this startup consists of four members: an experienced software developer who can handle both frontend development tasks such as UI / UX design but also backend development tasks related dynamic content creation etc.; an experienced marketer who can handle both online & offline marketing tasks such as PPC campaigns & trade show attendance; a sales representative capable of managing relationships with current & potential clients; and a project manager responsible for getting things done efficiently & effectively within the team while maintaining good communication between all members involved in the project.',
        category: 'Writing',
      },
    },
  ];

  for (const prompt of prompts) {
    const dataUri = await uploadToIPFS(prompt.data);
    if (!dataUri) throw new Error('Failed to upload to IPFS');

    console.log('Data Uri: ', dataUri);

    // Set data
    const tx = await promptHunt.connect(prompt.signer).createPrompt(dataUri);
    const receipt = await tx.wait();

    const promptId = receipt.events?.find((e) => e.event === 'PromptCreated')?.args?.id;
    console.log('Created new prompt with id: ', promptId);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
