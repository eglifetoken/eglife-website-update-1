# EGLIFE - Referral & Royalty Tree Feature Development Guide

This document outlines the technical requirements for building a referral and royalty tree visualization feature for the EGLIFE website. This guide is intended to be shared with a freelance developer to ensure they have a clear understanding of the project scope.

---

## **1. Project Objective**

The goal is to create a feature that allows a logged-in user to see their entire referral network in a hierarchical tree structure. This includes:
1.  Their direct (Level 1) referrals.
2.  The referrals of their referrals, down to 10 levels.
3.  A view or summary of the "royalty" network, which includes all users beyond the 10th level.

The frontend is already built. This project is **exclusively for the backend data indexing and API service**.

---

## **2. The Core Technical Challenge**

Blockchain smart contracts are not databases. While the EGLIFE staking contract (`0xb80F123d2E5200F1Cb6dEfd428f5aDa543C94E76`) emits an event every time a user stakes with a sponsor, it does not store a queryable list of all referral relationships.

It is **not possible** to build this tree by querying the blockchain directly from the user's web browser. It would be too slow and would crash the application.

The solution is to create a backend **"indexer"** service.

### **What is an Indexer?**

An indexer is a service that runs on a server and continuously listens to the blockchain. Its job is to:
1.  Watch for a specific event from our smart contract (in this case, the `Staked` event).
2.  When it sees a `Staked` event, it reads the data: the user's address (`user`) and their sponsor's address (`sponsor`).
3.  It then saves this relationship (`user` -> `sponsor`) into a traditional, fast database (like PostgreSQL or MongoDB).

By doing this, the indexer builds a complete and easily searchable map of the entire referral network.

---

## **3. Technical Requirements for the Developer**

### **Part A: The Indexer**

The developer needs to build and deploy a service that performs the following:

1.  **Connect to the BNB Smart Chain (BSC)**: The service must connect to a BSC node (e.g., using a provider like Infura, Alchemy, or a public RPC).
2.  **Listen for `Staked` Events**: It must continuously monitor the EGLIFE Staking Contract at address `0xb80F123d2E5200F1Cb6dEfd428f5aDa543C94E76` for the `Staked` event.
    *   The event signature is: `event Staked(address indexed user, uint256 grossAmount, uint256 netStaked, address indexed sponsor);`
3.  **Process Historical Events**: On its first run, the indexer must process all `Staked` events from the block the contract was created up to the present.
4.  **Store the Data**: For each event, it must store the relationship between the `user` and their `sponsor` in a database. The database schema should be optimized for hierarchical queries (e.g., using recursive queries in SQL or graph features in NoSQL).

**Recommended Technologies:** A developer can use various tools for this, such as:
*   **Custom Script:** A Node.js script using libraries like `Ethers.js` or `Viem`.
*   **TheGraph:** A decentralized indexing protocol designed specifically for this purpose. This is a very robust and common solution.
*   **Third-Party Indexing Services:** Services like Subsquid or Ponder.

### **Part B: The API**

Once the data is indexed, the developer must create a simple API that the website can call to get the referral tree data. The API should have one primary endpoint:

*   **Endpoint:** `GET /api/referrals/{userAddress}`

*   **Functionality:** Given a user's wallet address, this endpoint should return a JSON object representing their full downline referral tree, structured in a nested format.

*   **Example JSON Response:**
    ```json
    {
      "address": "0xUserA",
      "level": 0,
      "children": [
        {
          "address": "0xUserB",
          "level": 1,
          "children": [
            {
              "address": "0xUserD",
              "level": 2,
              "children": []
            }
          ]
        },
        {
          "address": "0xUserC",
          "level": 1,
          "children": []
        }
      ],
      "totalDownline": 3,
      "downlineByLevel": {
        "1": 2,
        "2": 1
      }
    }
    ```

---

## **4. How to Hire and What to Expect**

1.  **Where to Post:**
    *   **Upwork:** Excellent for finding experienced blockchain developers. Use the title "Build Blockchain Indexer and API for Referral Tree on BSC."
    *   **Fiverr Pro:** For high-quality, vetted developers.
    *   **Gitcoin Bounties:** To find developers native to the Web3 space.

2.  **Job Description:** You can use the content of this document as the core of your job description.

3.  **Estimated Cost:** A project of this nature is moderately complex. Depending on the developer's experience and the technology used, a rough estimate would be between **$500 - $2,500**. A custom script might be cheaper, while a solution using TheGraph might be more robust and expensive.

4.  **Timeline:** An experienced developer should be able to complete the indexer and API within **1-3 weeks**.

By providing this guide, you ensure the developer understands exactly what is needed, which will lead to a faster and more successful project delivery. Once this backend is complete, I can help you integrate it into the frontend website.

    