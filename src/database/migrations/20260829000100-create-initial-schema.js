'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
      role: {
        type: Sequelize.STRING(120),
        allowNull: true,
      },
      bio: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      avatar_url: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      linked_in_url: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      github_url: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.createTable('cohorts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      slug: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.createTable('participants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      cohort_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'cohorts',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      status: {
        type: Sequelize.STRING(30),
        allowNull: false,
        defaultValue: 'active',
      },
      joined_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      left_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.createTable('contributions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      cohort_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'cohorts',
          key: 'id',
        },
        onDelete: 'SET NULL',
      },
      project_context: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING(120),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });

    await queryInterface.addConstraint('users', {
      fields: ['linked_in_url'],
      type: 'unique',
      name: 'users_linked_in_url_unique',
    });

    await queryInterface.addConstraint('users', {
      fields: ['github_url'],
      type: 'unique',
      name: 'users_github_url_unique',
    });

    await queryInterface.sequelize.query(
      "ALTER TABLE users ADD CONSTRAINT users_linkedin_url_format_ck CHECK (linked_in_url IS NULL OR linked_in_url ~ '^https?://');"
    );

    await queryInterface.sequelize.query(
      "ALTER TABLE users ADD CONSTRAINT users_github_url_format_ck CHECK (github_url IS NULL OR github_url ~ '^https?://');"
    );

    await queryInterface.sequelize.query(
      'CREATE UNIQUE INDEX IF NOT EXISTS users_linked_in_url_idx ON users (linked_in_url) WHERE linked_in_url IS NOT NULL;'
    );

    await queryInterface.sequelize.query(
      'CREATE UNIQUE INDEX IF NOT EXISTS users_github_url_idx ON users (github_url) WHERE github_url IS NOT NULL;'
    );

    await queryInterface.sequelize.query(
      "CREATE UNIQUE INDEX IF NOT EXISTS participants_active_cohort_idx ON participants (user_id, cohort_id) WHERE status = 'active';"
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable('contributions');
    await queryInterface.dropTable('participants');
    await queryInterface.dropTable('cohorts');
    await queryInterface.dropTable('users');
  },
};
