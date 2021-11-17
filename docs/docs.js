/**
 * @swagger
 * /api/register:
 *  post:
 *   description: Register a new user
 *   tags:
 *   - User
 *   parameters:
 *   - name: user data
 *     in: body
 *     schema:
 *      type: object
 *      required:
 *      - email
 *      - password
 *      - first_name
 *      - last_name
 *      properties:
 *          first_name:
 *             type: string
 *          last_name:
 *             type: string
 *          email:
 *             type: string
 *          password:
 *             type: string
 *     description: User data, all fields are required
 *   responses:
 *      '200':
 *          description: A successful response
 *      '400':
 *          description: Bad request
 *      '500':
 *          description: Internal server error
 *      '403':
 *          description: Forbidden
 * 
 * /api/login:
 *  post:
 *    description: Login a user
 *    tags:
 *    - User
 *    parameters:
 *    - name: login data
 *      in: body
 *      schema:
 *      type: object
 *      required:
 *      - email
 *      - password
 *      properties:
 *         email:
 *            type: string
 *         password:
 *            type: string
 *      description: Login data, all fields are required
 *    responses:
 *      '200':
 *          description: A successful response
 *      '400':
 *          description: Bad request
 *      '500':
 *          description: Internal server error
 *      '403':
 *          description: Forbidden
 * 
 * /api/categories:
 *  get:
 *   description: Get all categories  (admin only) 
 *   tags:
 *   - Categories
 *   produces:
 *   - application/json
 *   parameters:
 *   - name: x-access-token
 *     in: header
 *     description: Bearer token
 *     required: true
 *   responses:
 *      '200':
 *          description: A successful response
 *      '500':
 *          description: Internal server error
 *      '403':
 *          description: Unauthorized
 * 
 *  post:
 *   description: Create a new category
 *   tags:
 *   - Categories
 *   produces:
 *   - application/json
 *   parameters:
 *   - name: x-access-token
 *     in: header
 *     description: Bearer token
 *     required: true
 *   - name: new category data
 *     in: body
 *     description: name of the category
 *     required: true
 *     schema:
 *      type: object
 *      required:
 *      - name
 *      properties:
 *         name:
 *           type: string
 *   responses:
 *     '200':
 *      description: Cetegory created
 *     '500':
 *      description: Internal server error
 *     '403':
 *      description: Unauthorized
 * 
 * /api/userCategories:
 *  get:
 *   description: Get all categories of an user
 *   tags:
 *   - Categories
 *   produces:
 *   - application/json
 *   parameters:
 *   - name: x-access-token
 *     in: header
 *     description: Bearer token
 *     required: true
 *   responses:
 *     '200':
 *        description: A successful response
 *     '500':
 *        description: Internal server error
 *     '403':
 *        description: Unauthorized
 * 
 * /api/user/{userId}/categories/{id}:
 *  get:
 *   description: Get a specific category of an user
 *   tags:
 *   - Categories
 *   produces:
 *   - application/json
 *   parameters:
 *   - name: x-access-token
 *     in: header
 *     description: Bearer token
 *     required: true
 *   - name: userId
 *     in: path
 *     description: Id of the user
 *     required: true
 *     type: integer
 *   - name: id
 *     in: path
 *     description: Id of the category
 *     required: true
 *     type: integer
 *   responses:
 *     '200':
 *      description: A successful response
 *     '500':
 *      description: Internal server error
 *     '403':
 *      description: Unauthorized
 * 
 *  put:
 *   description: Update a specific category of an user
 *   tags:
 *   - Categories
 *   produces:
 *   - application/json
 *   parameters:
 *   - name: x-access-token
 *     in: header
 *     description: Bearer token
 *     required: true
 *   - name: userId
 *     in: path
 *     description: Id of the user
 *     required: true
 *     type: integer
 *   - name: id
 *     in: path
 *     description: Id of the category
 *     required: true
 *     type: integer
 *   - name: category data to update
 *     in: body
 *     description: name of the category
 *     required: true
 *     schema:
 *      type: object
 *      required:
 *      - name
 *      properties:
 *       name:
 *        type: string
 *   responses:
 *    '200':
 *     description: A successful response
 *    '500':
 *     description: Internal server error
 *    '403':
 *     description: Unauthorized
 * 
 *  delete:
 *   description: Delete a specific category of an user
 *   tags:
 *   - Categories
 *   produces:
 *   - application/json
 *   parameters:
 *   - name: x-access-token
 *     in: header
 *     description: Bearer token
 *     required: true
 *   - name: userId
 *     in: path
 *     description: Id of the user
 *     required: true
 *     type: integer
 *   - name: id
 *     in: path
 *     description: Id of the category
 *     required: true
 *     type: integer
 *   responses:
 *    '200':
 *     description: A successful response
 *    '500':
 *     description: Internal server error
 *    '403':
 *     description: Unauthorized
 * 
 * /api/links:
 *  get:
 *   description: Get all links (admin only)
 *   tags:
 *   - Links
 *   produces:
 *   - application/json
 *   parameters:
 *   - name: x-access-token
 *     in: header
 *     description: Bearer token
 *     required: true
 *   responses:
 *     '200':
 *       description: A successful response
 *     '500':
 *       description: Internal server error
 *     '403':
 *       description: Unauthorized
 * 
 *  post:
 *   description: Create a new link
 *   tags:
 *   - Links
 *   produces:
 *   - application/json
 *   parameters:
 *   - name: x-access-token
 *     in: header
 *     description: Bearer token
 *     required: true
 *   - name: new link data
 *     in: body
 *     description: data for the link
 *     required: true
 *     schema:
 *      type: object
 *      required:
 *      - link
 *      - category
 *      - method
 *      properties:
 *        link:
 *         type: string
 *        category:
 *         type: string
 *        method:
 *         type: string
 *      example:
 *       link: http://www.google.com
 *       category: "Id of the category (ex: 6194cfa728158b5be4a35e52)"
 *       method: "GET"
 *   responses:
 *    '200':
 *      description: A successful response
 *    '500':
 *      description: Internal server error
 *    '403':
 *      description: Unauthorized
 * 
 * /api/user/{userId}/links/{id}:
 *  get:
 *   description: Get a specific link of an user
 *   tags:
 *   - Links
 *   produces:
 *   - application/json
 *   parameters:
 *   - name: x-access-token
 *     in: header
 *     description: Bearer token
 *     required: true
 *   - name: userId
 *     in: path
 *     description: Id of the user
 *     required: true
 *     type: integer
 *   - name: id
 *     in: path
 *     description: Id of the link
 *     required: true
 *     type: integer
 *   responses:
 *    '200':
 *     description: A successful response
 *    '500':
 *     description: Internal server error
 *    '403':
 *     description: Unauthorized
 * 
 * 
 *  put:
 *   description: Update a specific link of an user
 *   tags:
 *   - Links
 *   produces:
 *   - application/json
 *   parameters:
 *   - name: x-access-token
 *     in: header
 *     description: Bearer token
 *     required: true
 *   - name: userId
 *     in: path
 *     description: Id of the user
 *     required: true
 *     type: integer
 *   - name: id
 *     in: path
 *     description: Id of the link
 *     required: true
 *     type: integer
 *   - name: link data to update
 *     in: body
 *     description: data to change for the link
 *     required: true
 *     schema:
 *      type: object
 *      required:
 *      - category
 *      properties:
 *        link:
 *         type: string
 *        category:
 *         type: string
 *        method:
 *         type: string
 *        newCategory:
 *         type: string
 *      example:
 *       link: http://www.google.com(new, optional)
 *       category: "Id of the category (ex: 6194cfa728158b5be4a35e52)"
 *       method: "GET(new, optional)"
 *       newCategory: "Id of the new category (ex: 6194cfa728158b5be4a35f45, optional)"
 *   responses:
 *    '200':
 *      description: A successful response
 *    '500':
 *      description: Internal server error
 *    '403':
 *      description: Unauthorized
 * 
 *  delete:
 *   description: Delete a specific link of an user
 *   tags:
 *   - Links
 *   produces:
 *   - application/json
 *   parameters:
 *   - name: x-access-token
 *     in: header
 *     description: Bearer token
 *     required: true
 *   - name: userId
 *     in: path
 *     description: Id of the user
 *     required: true
 *     type: integer
 *   - name: id
 *     in: path
 *     description: Id of the link
 *     required: true
 *     type: integer
 *   responses:
 *    '200':
 *      description: A successful response
 *    '500':
 *      description: Internal server error
 *    '403':
 *      description: Unauthorized
 * 
 */