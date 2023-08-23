## Final Project
Web Programming with Python and JavaScript.
## Introduction
[This website](https://goldenbook-365b5f9f7268.herokuapp.com/) is a web app version of a language learning method. The original method is normally used on real notebooks by language learners. You can see the details of method [here](https://www.open.edu/openlearn/languages/learning-languages/the-goldlist-method).

This method is all about improving long term memory. Here is the basic explanation of the method.
 
**On the first day**, the learner should write **20 - 35 words** or expressions in the target language that he/she wants to learn and the meaning of these words or expressions on the **first page** of the notebook. **On the second day**, the learner should write **20 - 35 new words** on the **third page of the notebook**. This will continue for **two weeks**. At the end of two weeks, the learner should try to remember the meaning of the words on the **first page**. If the learner remembers a word's meaning, then he/she eliminates this word by putting a checkmark on the word. Then learner will write the unremembered words/expression and their meanings at **the top of the second page**. The rewriting is main memorizing method here. Learners do not sit and try to memorize words. They just write it down and when they write words again in again over the weeks, they will remember these words even 6 or 12 months later. After distilling the unremembered words, the learner should write 20 - 35 new words on the new page (the learner should always write new words every day). Here is a basic scheme for this procedure:

![image](https://www.open.edu/openlearn/pluginfile.php/3278519/tool_ocwmanage/articletext/0/image_of_notepad2.png)

### Step 1 
Write **20 - 35** words or expressions to A section.

### Step 2 
**Two weeks later** Write to B section the words/expressions that you did not remember from section A.
### Step 3
**Two weeks later (after step 2)** write unremembered words to **section C** from **section B**.
### Step 4
**Two weeks later (after step 3)** do the same thing as **section C** in **in step 3**.
### Step 5
After two weeks, If there are unremembered words in section D, write these words to A section of pages of the new books.

The first book learner completed is called **bronze book**, the second book is called **silver book**, and the third book is, of course, **golden book**.

# About Website
### The adaptation of the method to my website

In [this website](https://goldenbook-365b5f9f7268.herokuapp.com/) users can create multiple books/notebooks(golden, silver or bronze).

Every book can have maximum **50 pages**. 

Users can select that how many words they want to write on a page.

Every section(A, B, C, D) in the method, I did those in a single page. So users will write distilled words on the same page. 

## Project Structure

### Login / Register 

- Classical Login / Register Pages

![Alt Text](https://i.hizliresim.com/c5m27e5.png)

![Alt Text](https://i.hizliresim.com/pcym8xf.png)

### Main Page

- In the beginnig there is no book yet. 

![Alt Text](https://i.hizliresim.com/920exv4.png)

- Create Book with **Create New Book** button.

![Alt Text](https://i.hizliresim.com/25r4wmr.png)

- After filling the fields click **Create**.

![Alt Text](https://i.hizliresim.com/cyq9cah.png)

- After adding multiple books it will look like this. You can scroll on x-axis with **left** and **right** buttons.

- When you clicked a book, you'll be navigated to book's pages page.

![Alt Text](https://i.hizliresim.com/5s3f2x5.png)

- At the beginning there is only one page created. But you can create up to 50 pages for every book by clicking **New Page** icon.

![Alt Text](https://i.hizliresim.com/7jshfep.png)

- Click on the **first page**

![Alt Text](https://i.hizliresim.com/2tsst98.png)

- Here you'll see prefilled word fields. You can add new words using **Edit Button**.

![Alt Text](https://i.hizliresim.com/ebbu9ss.png)

- Click **Green Save Button** to save individual word.
- Click **Blue Save Button** to save all words.

![Alt Text](https://i.hizliresim.com/bprc7i2.png)

- Click **Back to pages** button. After two weeks later you'll come to this page to guess the words.

***After Two Weeks***

- Click **first page**

![Alt Text](https://i.hizliresim.com/kywd6p0.png)

- Click the **eye icon** to see the word or meaning. Just open up one because you'll guess either meaning or word. Then open up both of them to check if you remembered it correctly. Put a checkmark on the words that you have remembered.  
![Alt Text](https://i.hizliresim.com/k8zhin4.png)


- Then click **Blue Save Button**

![Alt Text](https://i.hizliresim.com/ct481xt.png)

- Click **Rewrite Words** to rewrite unremembered words.

![Alt Text](https://i.hizliresim.com/o40r7r1.png)

- Rewrite the words as above the fields and save them by clicking **Green Save Button**
- Click **Blue Save Button** to save all the changes.
- Then click **Back to pages** button.

This loop will continue over the weeks until there are no words remaining.
After remembering all the words the page view will look like this:

![Alt Text](https://i.hizliresim.com/qtt1d1e.png)

- On the right side of every word you will see how many times you have repeated that word.

## Requirements
- Git clone this app.
- To be able to run this app, open your command line terminal and navigate to the directory where the **requirements.txt** file is located.

**Note:** Before this pip must be installed.

Click [here](https://www.geeksforgeeks.org/how-to-install-pip-on-windows/) to see how to install **pip for Windows**

Click [here](https://macpaw.com/how-to/install-pip-mac) to see how to install **pip for Mac**
- Run this command:

`pip install -r requirements.txt`

- And migrate to database:

`python manage.py makemigrations book`

- Then run this:
 
`python manage.py migrate`

- Then run the server:

`python manage.py runserver`
